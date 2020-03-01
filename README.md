# Prerequisites
1. Node version v12.16.x
2. Mysql 8.0.x

# Setup
1. Create a database inside the mysql server (no need for table creation, it will be done by the application)
2. Add some configuration keys to the file 'config/default.json' (db creds and the server port to run on)
3. Execute 'npm install'
4. Execute 'npm start'

# API Documentation
1. Api documentation can be accessed at the server endpoint '/documentation' 
2. Basic Entites 
    a. Patient
    b. Doctor
    c. Clinic
    d. Assistant
    e. Appointment
    f. Document

# Note
1. All secured API's must have a prefix('Bearer ') to the authorization header.

# Flow
1. Patients, Doctors, Clinics have been generalized as users in this system. So every user has a corresponding role to it.
2. Signup api can be used to create these entites into the system.
3. Then a clinic(once logged in) can add assistants and doctors to it.
4. Then an assistant/a doctor can start creating appointments.
5. Then patients can add documents to an appointment.
6. Patients can also share these documents with other doctors, even if they are not a part of this clinic or any other clinic.
7. The Api documentation is self descriptive towards executing all these tasks.
