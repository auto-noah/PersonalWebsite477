from flask import current_app as app
from flask import render_template, redirect, request, session, url_for, copy_current_request_context
from flask_socketio import SocketIO, emit, join_room, leave_room, close_room, rooms, disconnect
from .utils.database.database  import database
from werkzeug.datastructures   import ImmutableMultiDict
from pprint import pprint
import json
import random
import functools
from . import socketio
db = database()


#######################################################################################
# AUTHENTICATION RELATED
#######################################################################################
def login_required(func):
    @functools.wraps(func)
    def secure_function(*args, **kwargs):
        if "email" not in session:
            return redirect(url_for("login", next=request.url))
        return func(*args, **kwargs)
    return secure_function

def getUser():
	return db.reversibleEncrypt('decrypt', session['email']) if 'email' in session else 'Unknown'

@app.route('/login')
def login():
	return render_template('login.html', user=getUser())

@app.route('/logout')
def logout():
	session.pop('email', default=None)
	return redirect('/')

@app.route('/processlogin', methods = ["POST","GET"])
def processlogin():
	# Grab user login data from form
	form_fields = dict((key, request.form.getlist(key)[0]) for key in list(request.form.keys()))
	
	# Encrypt user's email for session
	session['email'] = db.reversibleEncrypt('encrypt', form_fields['email']) 

	# Authenticate the user's input data
	auth_res = db.authenticate(email=form_fields['email'], password=form_fields['password'])
	return json.dumps(auth_res) 


#######################################################################################
# CHATROOM RELATED
#######################################################################################
@app.route('/chat')
@login_required
def chat():
    return render_template('chat.html', user=getUser())

# Joining room
@socketio.on('joined', namespace='/chat')
def joined(message):
	# Join room
	join_room('main')

	# Check if user is owner & emit
	if getUser() == 'owner@email.com':
		emit('status', {'msg': getUser() + ' has entered the room.', 'style': 'width: 100%;color:blue;text-align: right'}, room='main')
	else:
		emit('status', {'msg': getUser() + ' has entered the room.', 'style': 'width: 100%;color:grey;text-align: left' }, room='main')

# Leaving room
@socketio.on('leaving', namespace='/chat')
def leaving(message):
	# Check if user is owner & emit
	if getUser() == 'owner@email.com':
		emit('status', {'msg': getUser() + ' has left the room.', 'style': 'width: 100%;color:blue;text-align: right'}, room='main')
	else:
		emit('status', {'msg': getUser() + ' has left the room.', 'style': 'width: 100%;color:grey;text-align: left' }, room='main')
	
	# Leave room
	leave_room('main')

# Sending message
@socketio.on('sending', namespace='/chat')
def sendingMsg(message):
	# Check if user is owner & emit
	if getUser() == 'owner@email.com':
		message['style'] = 'width: 100%;color:blue;text-align: right'
	else:
		message['style'] = 'width: 100%;color:grey;text-align: left'

	# Emit message
	emit('status', message, room='main')


#######################################################################################
# OTHER
#######################################################################################
@app.route('/')
def root():
	return redirect('/home')

@app.route('/home')
def home():
	print(db.query('SELECT * FROM users'))
	x = random.choice(['My middle name is Shaw (my parents met at the dorm).',
					   'I am missing a digit in my right pinky!',
					   'I have had glasses since 6th grade ;(',
					   'I broke my femur during gym class.',
					   'I have a dog named Whiskey.',
					   'I was born in Chicago.'])
	return render_template('home.html', user=getUser(), fun_fact = x)

@app.route('/resume')
def resume():
	resume_data = db.getResumeData()
	pprint(resume_data)
	return render_template('resume.html', user=getUser(), resume_data = resume_data)

@app.route('/projects')
def projects():
	return render_template('projects.html', user=getUser())

@app.route('/piano')
def piano():
	return render_template('piano.html', user=getUser())

@app.route('/processfeedback', methods = ['POST'])
def processfeedback():
	feedback = request.form
	feedback = feedback.to_dict()

	db.insertRows(table='feedback', columns=list(feedback.keys()), parameters=[list(feedback.values())])
	feedback_query = db.query('SELECT * FROM feedback')
	pprint(feedback_query)
	return render_template('processfeedback.html', user=getUser(), feedback_query = feedback_query)

@app.route("/static/<path:path>")
def static_dir(path):
    return send_from_directory("static", path)

@app.after_request
def add_header(r):
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate, public, max-age=0"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    return r
