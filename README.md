# AWS DevOps CI/CD Pipeline

## Project Overview

This project automates the deployment of a Node.js application to AWS EC2 using Jenkins, Docker, Terraform, and Ansible.

The CI/CD pipeline retrieves code from GitHub, validates the application, builds a Docker image, pushes it to Docker Hub, and deploys it to AWS EC2 using Ansible.

## Architecture

```text
GitHub → Jenkins → Validate Code → Build Docker Image
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

## Technologies Used

| Technology      | Purpose                              |
| --------------- | ------------------------------------ |
| AWS EC2         | Hosts Jenkins and the application    |
| Terraform       | Infrastructure provisioning          |
| Git and GitHub  | Version control                      |
| Jenkins         | CI/CD automation                     |
| Docker          | Application containerization         |
| Docker Hub      | Docker image repository              |
| Ansible         | Automated deployment                 |
| Node.js and npm | Application runtime and dependencies |

## CI/CD Pipeline

1. **Checkout Code:** Retrieves source code from GitHub.
2. **Install Dependencies:** Installs Node.js packages using `npm ci`.
3. **Validate Application:** Checks JavaScript syntax using `node --check app.js`.
4. **Build Docker Image:** Creates a Docker image using the Dockerfile.
5. **Push to Docker Hub:** Publishes versioned images and the `latest` tag.
6. **Test Ansible Connection:** Verifies SSH connectivity to the application EC2.
7. **Deploy Application:** Uses Ansible to pull the image and restart the container.
8. **Health Check:** Verifies the application responds successfully.

Jenkins Poll SCM is configured to check GitHub for changes periodically.

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
└── ansible/
    └── deploy.yml
```

## Application Endpoints

The Node.js application runs on port `3000`.

| Endpoint   | Purpose                   |
| ---------- | ------------------------- |
| `/`        | Application homepage      |
| `/health`  | Application health status |
| `/version` | Application version       |

## Run Locally

**Prerequisites:** Git, Node.js, and npm.

```bash
git clone https://github.com/Leela-Battu/aws-devops-platform.git
cd aws-devops-platform
npm ci
node app.js
```

Open `http://localhost:3000` to access the application.

## Run with Docker

Build and start the application container:

```bash
docker build -t aws-devops-app:local .
docker run -d --name aws-devops-app -p 3000:3000 aws-devops-app:local
```

Verify the application:

```bash
docker ps
curl http://localhost:3000/health
```

Stop and remove the container when finished:

```bash
docker stop aws-devops-app
docker rm aws-devops-app
```

## Security

* Store Docker Hub credentials and SSH private keys in Jenkins Credentials.
* Never commit passwords, access tokens, or private keys to GitHub.
* Restrict SSH and application ports to authorized sources.
* Keep the Jenkins dashboard accessible only to authorized users.
* Stop unused AWS resources to reduce costs.

## Key Learnings

* Built an automated CI/CD pipeline using Jenkins.
* Created and published Docker images.
* Provisioned AWS infrastructure using Terraform.
* Automated application deployment using Ansible.
* Configured secure credentials and application health checks.

## Author

**Leela Battu**

GitHub: [Leela-Battu](https://github.com/Leela-Battu)

Project Repository: [aws-devops-platform](https://github.com/Leela-Battu/aws-devops-platform)
