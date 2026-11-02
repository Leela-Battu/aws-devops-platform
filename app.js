const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
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
          color: #243247;
        }

        nav {
          background: #142b4a;
          color: white;
          padding: 20px 8%;
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
          color: #a9c8f5;
          font-size: 14px;
        }

        .hero {
          text-align: center;
          padding: 75px 20px 55px;
          background: white;
        }

        .hero h1 {
          font-size: 36px;
          margin-bottom: 16px;
          color: #142b4a;
        }

        .hero p {
          font-size: 17px;
          color: #64748b;
          line-height: 1.6;
        }

        .status {
          display: inline-block;
          margin-top: 25px;
          padding: 10px 20px;
          background: #e5f8ed;
          color: #16834b;
          border-radius: 25px;
          font-size: 14px;
          font-weight: bold;
        }

        .container {
          max-width: 1100px;
          margin: 50px auto;
          padding: 0 20px;
        }

        .section-title {
          text-align: center;
          margin-bottom: 30px;
        }

        .section-title h2 {
          color: #142b4a;
          font-size: 27px;
          margin-bottom: 10px;
        }

        .section-title p {
          color: #64748b;
        }

        .cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
          gap: 20px;
        }

        .card {
          background: white;
          padding: 28px 20px;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.06);
          border: 1px solid #e7edf5;
          text-align: center;
          transition: transform 0.2s;
        }

        .card:hover {
          transform: translateY(-5px);
        }

        .card .icon {
          font-size: 35px;
          margin-bottom: 15px;
        }

        .card h3 {
          color: #1d4e89;
          margin-bottom: 10px;
        }

        .card p {
          color: #64748b;
          font-size: 14px;
          line-height: 1.5;
        }

        .deployment {
          background: white;
          padding: 28px;
          margin-top: 35px;
          border-radius: 12px;
          text-align: center;
          border: 1px solid #e7edf5;
        }

        .deployment h2 {
          color: #142b4a;
          margin-bottom: 12px;
        }

        .deployment p {
          color: #64748b;
          line-height: 1.7;
        }

        footer {
          background: #142b4a;
          color: #d5dfed;
          text-align: center;
          padding: 22px;
          margin-top: 60px;
          font-size: 14px;
        }

        @media (max-width: 600px) {
          .hero h1 {
            font-size: 28px;
          }

          nav {
            justify-content: center;
            text-align: center;
          }
        }
      </style>
    </head>

    <body>

      <nav>
        <h2>☁ AWS DevOps Platform</h2>
        <span>Automated Deployment Project</span>
      </nav>

      <section class="hero">
        <h1>Welcome to My DevOps Project</h1>

        <p>
          Building and deploying a Node.js application using
          modern DevOps tools and AWS Cloud.
        </p>

        <div class="status">
          ● Application Running Successfully
        </div>
      </section>

      <main class="container">

        <div class="section-title">
          <h2>Technologies Used</h2>
          <p>Tools and technologies powering this deployment</p>
        </div>

        <div class="cards">

          <div class="card">
            <div class="icon">☁️</div>
            <h3>AWS</h3>
            <p>Cloud infrastructure and EC2 hosting.</p>
          </div>

          <div class="card">
            <div class="icon">🐳</div>
            <h3>Docker</h3>
            <p>Containerization and application packaging.</p>
          </div>

          <div class="card">
            <div class="icon">🔧</div>
            <h3>Jenkins</h3>
            <p>Automated continuous integration and delivery.</p>
          </div>

          <div class="card">
            <div class="icon">🏗️</div>
            <h3>Terraform</h3>
            <p>Infrastructure provisioning using code.</p>
          </div>

          <div class="card">
            <div class="icon">⚙️</div>
            <h3>Ansible</h3>
            <p>Configuration management and deployment.</p>
          </div>

        </div>

        <section class="deployment">
          <h2>Deployment Information</h2>
          <p>
            Application: Node.js + Express<br>
            Container Platform: Docker<br>
            CI/CD Tool: Jenkins<br>
            Cloud Platform: Amazon Web Services<br>
            Deployment Automation: Ansible
          </p>
        </section>

      </main>

      <footer>
        AWS DevOps Platform | Built with Node.js, Docker and AWS
      </footer>

    </body>
    </html>
  `);
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    message: "Application is running successfully"
  });
});

app.get("/version", (req, res) => {
  res.json({
    application: "AWS DevOps Platform",
    version: "2.0.0"
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Application running on port ${PORT}`);
});
