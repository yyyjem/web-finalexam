import java.io.*;

@WebServlet("/journalism")
public class JournalismIntroServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        out.println("""
            <!DOCTYPE html>
            <html>
            <head>
                <title>Journalism Studies</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    :root {
                        --primary: #2c3e50;
                        --secondary: #e74c3c;
                    }

                    body{
                        font-family: 'Segoe UI', system-ui;
                        line-height: 1.6;
                        margin: 0;
                        background: linear-gradient(45deg, #f8f9fa, #e9ecef);
                    }

                    .hero-section {
                        background: var(--primary);
                        color: white;
                        padding: 4rem 2rem;
                        text-align: center;
                        clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%);
                    }

                    .card-container {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                        gap: 2rem;
                        padding: 2rem;
                        max-width: 1200px;
                        margin: -5rem auto 3rem;
                    }

                    .feature-card {
                        background: white;
                        border-radius: 10px;
                        padding: 2rem;
                        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                        transition: transform 0.3s ease;
                    }

                    .pill {
                        display: inline-block;
                        padding: 0.3rem 1rem;
                        background: var(--secondary);
                        color: white;
                        border-radius: 20px;
                        font-size: 0.9em;
                    }

                    @media (max-width: 768px) {
                        .card-container { padding: 1rem; }
                    }
                </style>
            </head>
            <body>
                <section class="hero-section">
                    <h1>Modern Journalism Studies</h1>
                    <p>Shaping the Future of Media Communication</p>
                </section>

                <div class="card-container">
                    <article class="feature-card">
                        <span class="pill">Core Curriculum</span>
                        <h2>Digital Storytelling</h2>
                        <p>Master multimedia reporting techniques across platforms including:</p>
                        <ul>
                            <li>Data Visualization</li>
                            <li>Podcast Production</li>
                            <li>Mobile Journalism</li>
                        </ul>
                    </article>

                    <article class="feature-card">
                        <span class="pill">Career Paths</span>
                        <h2>Industry Connections</h2>
                        <p>93% graduate employment rate with partners including:</p>
                        <ul>
                            <li>Reuters</li>
                            <li>BBC News</li>
                            <li>New York Times</li>
                        </ul>
                    </article>
                </div>
            </body>
            </html>
        """);
    }
}