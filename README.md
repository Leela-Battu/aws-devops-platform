# AWS DevOps CI/CD Pipeline

## Project Overview

This project automates the build and deployment of a Node.js application to AWS EC2 using Jenkins, Docker, Terraform, and Ansible.

Jenkins retrieves the source code from GitHub, installs dependencies, validates the application, builds a Docker image, pushes it to Docker Hub, and deploys the image to the application EC2 instance using Ansible.

Terraform is used to provision the AWS infrastructure.

## Architecture

```text
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
                    Health Check
```

Terraform provisions the AWS infrastructure used by the application and Jenkins.

## Technologies Used

| Technology      | Purpose                                       |
| --------------- | --------------------------------------------- |
| AWS EC2         | Hosts Jenkins and the application             |
| Terraform       | Infrastructure provisioning                   |
| Git and GitHub  | Version control and source code management    |
| Jenkins         | CI/CD automation                              |
| Docker          | Application containerization                  |
| Docker Hub      | Docker image storage                          |
| Ansible         | Automated application deployment              |
| Node.js and npm | Application runtime and dependency management |

## Repository Structure

```text
aws-devops-platform/
├── app.js
├── package.json
├── package-lock.json
├── Dockerfile
├── .dockerignore
├── .gitignore
├── Jenkinsfile
├── README.md
├── ansible/
│   └── deploy.yml
└── terraform/
    ├── main.tf
    ├── variables.tf
    ├── outputs.tf
    ├── versions.tf
    └── .terraform.lock.hcl
```

## CI/CD Pipeline

The Jenkins pipeline automates the following stages:

1. **Install Dependencies:** Checks Node.js and npm versions and installs packages using `npm ci`.
2. **Validate Application:** Checks JavaScript syntax using `node --check app.js`.
3. **Build Docker Image:** Builds an image using the project's Dockerfile.
4. **Push to Docker Hub:** Publishes the image using a Jenkins build-number tag and the `latest` tag.
5. **Test Ansible Connection:** Verifies SSH connectivity to the application EC2 instance.
6. **Deploy Application:** Executes the Ansible playbook to pull the image and restart the application container.
7. **Health Check:** Verifies the deployed application's health endpoint.

Jenkins Poll SCM is configured to check the GitHub repository periodically for changes.

## Docker Hub

Docker images are published to:

**[leelabattu/aws-devops-app](https://hub.docker.com/r/leelabattu/aws-devops-app/tags)**

The pipeline publishes images using tags such as:

```text
leelabattu/aws-devops-app:<BUILD_NUMBER>
leelabattu/aws-devops-app:latest
```

The build-number tag identifies a particular Jenkins build, while `latest` points to the most recently pushed image using that tag.

## Ansible Deployment

The deployment playbook is located at `ansible/deploy.yml`.

Ansible connects to the application EC2 instance over SSH and:

* Ensures Docker is running.
* Pulls the application image from Docker Hub.
* Creates or recreates the application container.
* Publishes port `3000`.
* Checks the application's health endpoint.

SSH keys and Docker Hub credentials are stored in Jenkins Credentials rather than in the pipeline code.

## Application Endpoints

The Node.js application runs on port `3000`.

| Endpoint   | Purpose                   |
| ---------- | ------------------------- |
| `/`        | Application homepage      |
| `/health`  | Application health status |
| `/version` | Application version       |

The `/health` endpoint is used to verify that the deployed application responds successfully.

## Run Locally

**Prerequisites:** Git, Node.js, and npm.

Clone the repository and install dependencies:

```bash
git clone https://github.com/Leela-Battu/aws-devops-platform.git
cd aws-devops-platform
npm ci
node app.js
```

Open `http://localhost:3000` in your browser.

## Run with Docker

Build and run the application:

```bash
docker build -t aws-devops-app:local .
docker run -d --name aws-devops-app -p 3000:3000 aws-devops-app:local
```

Verify the container and health endpoint:

```bash
docker ps
curl http://localhost:3000/health
```

Stop and remove the container when finished:

```bash
docker stop aws-devops-app
docker rm aws-devops-app
```

## Security and Best Practices

* Store Docker Hub credentials and SSH private keys in Jenkins Credentials.
* Never commit passwords, access tokens, private keys, or sensitive Terraform state files to GitHub.
* Restrict SSH and application access through AWS security groups.
* Keep the Jenkins dashboard accessible only to authorized users.
* Verify SSH host keys for secure deployments.
* Stop unused EC2 instances to reduce running costs.

## Key Learnings

* Implemented a Jenkins CI/CD pipeline.
* Automated Docker image building and publishing.
* Provisioned AWS infrastructure using Terraform.
* Automated application deployment using Ansible.
* Managed deployment credentials through Jenkins.
* Verified application deployment using health checks.

## Author

**Leela Battu**

* GitHub Profile: [Leela-Battu](https://github.com/Leela-Battu)
* Project Repository: [aws-devops-platform](https://github.com/Leela-Battu/aws-devops-platform)
* Docker Hub: [aws-devops-app](https://hub.docker.com/r/leelabattu/aws-devops-app/tags)
