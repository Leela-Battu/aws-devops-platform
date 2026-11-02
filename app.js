
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Home Dashboard
app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AWS DevOps Platform</title>

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            background: #f4f7fb;
            color: #263449;
            line-height: 1.6;
        }

        nav {
            background: #14243b;
            color: white;
            padding: 18px 8%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 12px;
        }

        nav h2 {
            font-size: 22px;
        }

        nav span {
            color: #65b8ff;
        }

        nav a {
            color: white;
            text-decoration: none;
            font-size: 14px;
        }

        .hero {
            text-align: center;
            padding: 65px 20px 45px;
            background: white;
        }

        .hero h1 {
            font-size: 38px;
            color: #14243b;
            margin-bottom: 12px;
        }

        .hero p {
            color: #68778b;
            font-size: 17px;
            margin-bottom: 22px;
        }

        .status {
            display: inline-block;
            background: #e4f8eb;
            color: #168344;
            padding: 9px 20px;
            border-radius: 25px;
            font-weight: bold;
            font-size: 14px;
        }

        .container {
            max-width: 1100px;
            margin: auto;
            padding: 45px 20px;
        }

        .section-title {
            text-align: center;
            font-size: 27px;
            color: #14243b;
            margin-bottom: 28px;
        }

        .cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
            gap: 20px;
        }

        .card {
            background: white;
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.06);
            border-top: 4px solid #2585d8;
            transition: transform 0.2s;
        }

        .card:hover {
            transform: translateY(-5px);
        }

        .card h3 {
            color: #14243b;
            margin-bottom: 10px;
            font-size: 20px;
        }

        .card p {
            color: #68778b;
            font-size: 14px;
        }

        .deployment {
            background: white;
            padding: 28px;
            border-radius: 12px;
            margin-top: 35px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }

        .deployment h2 {
            margin-bottom: 15px;
            color: #14243b;
        }

        .deployment p {
            margin: 8px 0;
            color: #53647a;
        }

        .deployment strong {
            color: #14243b;
        }

        footer {
            background: #14243b;
            color: #dce6f2;
            text-align: center;
            padding: 22px;
            font-size: 14px;
        }

        @media (max-width: 600px) {
            .hero h1 {
                font-size: 29px;
            }

            nav {
                padding: 16px 5%;
            }
        }
    </style>
</head>

<body>

    <nav>
        <h2>AWS <span>DevOps Platform</span></h2>
        <a href="/">Home</a>
    </nav>

    <section class="hero">
        <h1>Welcome to My DevOps Project</h1>
        <p>Automated CI/CD Pipeline and AWS Cloud Deployment</p>
        <div class="status">● Application Running Successfully</div>
    </section>

    <main class="container">

        <h2 class="section-title">Technologies Used</h2>

        <div class="cards">

            <div class="card">
                <h3>☁️ AWS</h3>
                <p>EC2 instances used to host Jenkins and deploy the application in the cloud.</p>
            </div>

            <div class="card">
                <h3>🐳 Docker</h3>
                <p>Containerized the Node.js application and published the image to Docker Hub.</p>
            </div>

            <div class="card">
                <h3>⚙️ Jenkins</h3>
                <p>Automated the CI/CD pipeline to build, test, and deploy the application.</p>
            </div>

            <div class="card">
                <h3>🏗️ Terraform</h3>
                <p>Used Infrastructure as Code to manage cloud infrastructure.</p>
            </div>

            <div class="card">
                <h3>🚀 Ansible</h3>
                <p>Automated application deployment on the AWS EC2 instance.</p>
            </div>

            <div class="card">
                <h3>📦 GitHub</h3>
                <p>Managed application source code and triggered pipeline updates through Git.</p>
            </div>

        </div>

        <section class="deployment">
            <h2>Deployment Information</h2>
            <p><strong>Application:</strong> AWS DevOps Platform</p>
            <p><strong>Runtime:</strong> Node.js and Express</p>
            <p><strong>Container:</strong> Docker</p>
            <p><strong>CI/CD:</strong> Jenkins</p>
            <p><strong>Cloud:</strong> Amazon Web Services</p>
            <p><strong>Deployment Status:</strong> Successfully Deployed</p>
            <p><strong>Version:</strong> 2.0.0</p>
        </section>

    </main>

    <footer>
        <p>Built with Node.js, Docker, Jenkins, Terraform, Ansible and AWS</p>
        <p>My AWS DevOps Platform | Version 2.0.0</p>
    </footer>

</body>
</html>
    `);
});

// Health Check API
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        message: 'Application is running successfully'
    });
});

// Version API
app.get('/version', (req, res) => {
    res.json({
        application: 'AWS DevOps Platform',
        version: '2.0.0'
    });
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`AWS DevOps Platform running on port ${PORT}`);
});
