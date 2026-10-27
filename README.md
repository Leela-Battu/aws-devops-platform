# Automated CI/CD and AWS Infrastructure Deployment Using Jenkins, Docker, Terraform & Ansible

## Project Overview

This project demonstrates an automated CI/CD pipeline for deploying a Node.js application to AWS EC2.

The pipeline uses Jenkins to retrieve source code from GitHub, install dependencies, validate the application, build a Docker image, push the image to Docker Hub, and deploy the application to an AWS EC2 instance using Ansible.

The infrastructure was provisioned using Terraform, and Docker is used to package and run the application consistently.

The goal is to automate application delivery, reduce manual deployment steps, and demonstrate practical DevOps and cloud engineering skills.

## Architecture

```text
                 Developer
                     |
                     v
               GitHub Repository
                     |
                     v
                Jenkins EC2
                     |
              Install Dependencies
                     |
                     v
              Validate Application
                     |
                     v
              Build Docker Image
                     |
                     v
                Docker Hub
                     |
                     v
              Ansible Deployment
                     |
                     v
             Application EC2
                     |
                     v
               Docker Container
                     |
                     v
             Application Health Check
```

## Technologies Used

| Technology       | Purpose                                                  |
| ---------------- | -------------------------------------------------------- |
| AWS EC2          | Hosts Jenkins and the Node.js application                |
| Terraform        | Provisions AWS infrastructure                            |
| Git and GitHub   | Source code management and version control               |
| Jenkins          | Automates the CI/CD pipeline                             |
| Node.js          | Runs the application                                     |
| npm              | Installs application dependencies                        |
| Docker           | Packages the application into a container image          |
| Docker Hub       | Stores and distributes Docker images                     |
| Ansible          | Automates application deployment                         |
| Linux and Ubuntu | Provide the environment for Jenkins and automation tools |

## Project Features

* Automated source code retrieval from GitHub.
* Dependency installation using `npm ci`.
* JavaScript syntax validation.
* Automated Docker image creation.
* Docker image versioning using Jenkins build numbers.
* Automated image publishing to Docker Hub.
* Secure credential management through Jenkins Credentials.
* SSH connectivity between Jenkins and the application EC2 instance.
* Automated deployment using Ansible.
* Application health verification after deployment.
* Jenkins Poll SCM configured to check the GitHub repository for changes.

## Repository Structure

```text
aws-devops-platform/
│
├── app.js
├── package.json
├── package-lock.json
├── Dockerfile
├── .dockerignore
├── .gitignore
├── Jenkinsfile
├── README.md
│
└── ansible/
    └── deploy.yml
```

## CI/CD Pipeline

The Jenkins pipeline contains the following stages.

### 1. Install Dependencies

Jenkins checks the Node.js and npm versions and installs the application dependencies using:

```bash
npm ci
```

### 2. Validate Application

The pipeline checks the JavaScript syntax:

```bash
node --check app.js
```

### 3. Build Docker Image

Jenkins builds a Docker image using the repository's Dockerfile.

```bash
docker build -t aws-devops-app:<BUILD_NUMBER> .
```

The Jenkins build number provides a unique image tag for each build.

### 4. Push to Docker Hub

Jenkins authenticates to Docker Hub using credentials stored in Jenkins Credentials.

It pushes two tags:

```text
leelabattu/aws-devops-app:<BUILD_NUMBER>
leelabattu/aws-devops-app:latest
```

The build-number tag identifies a particular pipeline build, while `latest` provides a convenient tag for the most recently pushed image.

### 5. Test Ansible Connection

Jenkins uses the application EC2 SSH credential to verify connectivity with the target server.

### 6. Deploy to Application EC2

Ansible executes the playbook at `ansible/deploy.yml`.

The playbook:

* Ensures the Docker service is running.
* Pulls the application image from Docker Hub.
* Creates or recreates the application container.
* Publishes application port 3000.
* Checks the application's health endpoint.

## Docker Configuration

The Dockerfile packages the Node.js application into a container based on Node.js Alpine Linux.

The image installs production dependencies and starts the application using:

```dockerfile
CMD ["node", "app.js"]
```

The application listens on port `3000`.

## Ansible Deployment

The Ansible playbook is located at:

```text
ansible/deploy.yml
```

It connects to the application EC2 instance over SSH and deploys the Docker image:

```text
leelabattu/aws-devops-app:latest
```

The deployment uses a restart policy so Docker can restart the application container when required.

After deployment, Ansible checks the health endpoint and expects an HTTP 200 response.

## Application Endpoints

Once the application is deployed and the relevant network access rules are configured, the application can be accessed through:

| Endpoint   | Purpose                                 |
| ---------- | --------------------------------------- |
| `/`        | Displays the application page           |
| `/health`  | Returns application health information  |
| `/version` | Returns application version information |

The application port is `3000`.

Use the current public IP address of the application EC2 instance when accessing these endpoints.

## Run the Application Locally

### Prerequisites

Install Node.js, npm, and Git.

### 1. Clone the repository

```bash
git clone https://github.com/Leela-Battu/aws-devops-platform.git
```

### 2. Enter the project directory

```bash
cd aws-devops-platform
```

### 3. Install dependencies

```bash
npm ci
```

### 4. Start the application

```bash
node app.js
```

### 5. Access the application

Open:

```text
http://localhost:3000
```

To check application health, visit:

```text
http://localhost:3000/health
```

## Run the Application Using Docker

Make sure Docker is installed and running.

### 1. Build the image

```bash
docker build -t aws-devops-app:local .
```

### 2. Start the container

```bash
docker run -d \
  --name aws-devops-app \
  -p 3000:3000 \
  aws-devops-app:local
```

### 3. Verify the container

```bash
docker ps
```

### 4. Test the health endpoint

```bash
curl http://localhost:3000/health
```

### 5. Stop the container

```bash
docker stop aws-devops-app
docker rm aws-devops-app
```

## Jenkins Configuration

The pipeline uses Jenkins Credentials to store sensitive information.

| Credential ID     | Purpose                                             |
| ----------------- | --------------------------------------------------- |
| `dockerhub-creds` | Authenticates Jenkins to Docker Hub                 |
| `app-ec2-ssh`     | Provides SSH access to the application EC2 instance |

Credentials are referenced by ID in the Jenkinsfile rather than storing passwords, access tokens, or private keys in the source code.

The Jenkins job uses the `Jenkinsfile` from the GitHub repository. Poll SCM is configured to check the repository periodically for changes.

## AWS Security Considerations

* Restrict SSH access to trusted IP addresses or security groups.
* Restrict the Jenkins dashboard to authorized users.
* Allow application port 3000 only from the required clients.
* Store Docker Hub tokens and SSH private keys in Jenkins Credentials.
* Never commit credentials or private keys to GitHub.
* Use SSH host-key verification for production deployments.
* Monitor AWS resources and stop EC2 instances when they are not needed.

## Future Improvements

* Configure GitHub webhooks for faster build triggering.
* Add automated unit and integration tests.
* Add Docker image vulnerability scanning.
* Improve deployment rollback and failure recovery.
* Configure HTTPS for externally accessible services.
* Add monitoring, logging, and alerting.
* Manage and document Terraform infrastructure configuration alongside the application.

## Learning Outcomes

Through this project, I gained practical experience with:

* CI/CD pipeline implementation using Jenkins.
* GitHub-based source code management.
* Node.js application validation.
* Docker image creation and distribution.
* AWS EC2 deployment.
* Infrastructure provisioning using Terraform.
* Configuration management and deployment automation using Ansible.
* Secure handling of deployment credentials.
* Application health verification.

## Author

**Leela Battu**

GitHub: [Leela-Battu](https://github.com/Leela-Battu)
