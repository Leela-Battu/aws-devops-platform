pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Verify Repository') {
            steps {
                sh 'echo "Repository checked out successfully"'
                sh 'ls -la'
            }
        }
    }
}
