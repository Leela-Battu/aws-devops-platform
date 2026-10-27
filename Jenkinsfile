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

        stage('Test Ansible Connection') {
            steps {
                withCredentials([
                    sshUserPrivateKey(
                        credentialsId: 'app-ec2-ssh',
                        keyFileVariable: 'APP_SSH_KEY',
                        usernameVariable: 'APP_SSH_USER'
                    )
                ]) {
                    sh '''
                        set +x
                        trap 'rm -f inventory.ini' EXIT

                        printf '[web]\\n15.207.113.159 ansible_user=%s ansible_ssh_private_key_file=%s\\n' \
                            "$APP_SSH_USER" "$APP_SSH_KEY" > inventory.ini

                        ANSIBLE_HOST_KEY_CHECKING=False \
                            ansible -i inventory.ini web -m ansible.builtin.ping
                    '''
                }
            }
        }
    }
}
