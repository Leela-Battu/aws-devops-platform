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

        stage('Push to Docker Hub') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKERHUB_USERNAME',
                        passwordVariable: 'DOCKERHUB_TOKEN'
                    )
                ]) {
                    sh '''
                        set +x
                        trap 'docker logout >/dev/null 2>&1 || true' EXIT

                        echo "$DOCKERHUB_TOKEN" | docker login \
                            --username "$DOCKERHUB_USERNAME" \
                            --password-stdin

                        docker tag aws-devops-app:${BUILD_NUMBER} \
                            "$DOCKERHUB_USERNAME/aws-devops-app:${BUILD_NUMBER}"

                        docker tag aws-devops-app:${BUILD_NUMBER} \
                            "$DOCKERHUB_USERNAME/aws-devops-app:latest"

                        docker push "$DOCKERHUB_USERNAME/aws-devops-app:${BUILD_NUMBER}"
                        docker push "$DOCKERHUB_USERNAME/aws-devops-app:latest"
                    '''
                }
            }
        }
    }
}
