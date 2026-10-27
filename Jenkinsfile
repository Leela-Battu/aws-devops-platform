pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'node --version'
                sh 'npm --version'
                sh 'npm ci'
            }
        }

        stage('Validate Application') {
            steps {
                sh 'node --check app.js'
                echo 'Application syntax validation completed!'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t aws-devops-app:${BUILD_NUMBER} .'
                sh 'docker images aws-devops-app'
            }
        }
    }
}
