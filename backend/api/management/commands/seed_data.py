import os
from django.core.management.base import BaseCommand
from api.models import (
    Department, Course, FacultyMember, CampusFacility, EventNews,
    KnowledgeEntry, KnowledgeChunk, ChatbotSettings
)

class Command(BaseCommand):
    help = 'Seeds initial imaginary college data for CIT'

    def handle(self, *args, **kwargs):
        self.stdout.write("Starting data seeding for CIT...")

        # 1. Chatbot Settings
        ChatbotSettings.objects.get_or_create(
            id=1,
            defaults={
                'assistant_name': 'CIT Buddy',
                'welcome_message': 'Hello! How can I help you today?',
                'suggested_questions': [
                    'Courses & Admissions',
                    'College Events',
                    'Campus Facilities',
                    'General Queries'
                ],
                'fallback_message': 'I apologize, but I do not have that specific detail in our verified records. Please contact the CIT Admissions Office at +91 44 2855 1000 or admissions@cit.edu.in for assistance! 😊',
                'model_name': 'gemini-3.5-flash',
                'relevance_threshold': 0.25,
                'daily_cap': 5000
            }
        )

        # 2. Departments
        dept_ca, _ = Department.objects.get_or_create(
            code='CA',
            defaults={
                'name': 'Department of Computer Applications',
                'description': 'Pioneering software excellence, web technologies, and mobile enterprise applications.',
                'head_of_department': 'Dr. Shalini Mukherjee',
                'icon': 'Code'
            }
        )

        dept_cs, _ = Department.objects.get_or_create(
            code='CS',
            defaults={
                'name': 'Department of Computer Science & Engineering',
                'description': 'Advanced computing, algorithms, distributed systems, and cutting-edge software architecture.',
                'head_of_department': 'Dr. Aarthi Natarajan',
                'icon': 'Cpu'
            }
        )

        dept_ai, _ = Department.objects.get_or_create(
            code='AI_DS',
            defaults={
                'name': 'Department of Artificial Intelligence & Data Science',
                'description': 'Specialized machine learning, generative models, big data analytics, and robotics engineering.',
                'head_of_department': 'Dr. Preeti Deshmukh',
                'icon': 'Brain'
            }
        )

        dept_comm, _ = Department.objects.get_or_create(
            code='COMM',
            defaults={
                'name': 'Department of Commerce & FinTech',
                'description': 'Integrating financial management with algorithmic trading, business analytics, and blockchain.',
                'head_of_department': 'Prof. M. K. Narayanan',
                'icon': 'TrendingUp'
            }
        )

        # 3. Courses
        courses_data = [
            {
                'code': 'BCA',
                'dept': dept_ca,
                'title': 'Bachelor of Computer Applications',
                'level': 'UG',
                'duration': '3 Years (6 Semesters)',
                'seats': 180,
                'fee': '₹85,000 / Year',
                'eligibility': '10+2 / Higher Secondary with Mathematics, Business Math, or Computer Science with minimum 55% aggregate marks.',
                'desc': 'A flagship undergraduate program designed for careers in software engineering, cloud computing, full-stack web development, and mobile app design.',
                'highlights': ['Full Stack React & Node.js Lab', 'Cloud Computing on AWS/GCP', '3 Industry Internships', '98% Placement Record'],
                'careers': ['Software Developer', 'Full Stack Engineer', 'Cloud Associate', 'Database Administrator', 'QA Automation Engineer']
            },
            {
                'code': 'B.Sc',
                'dept': dept_cs,
                'title': 'B.Sc in Computer Science',
                'level': 'UG',
                'duration': '3 Years (6 Semesters)',
                'seats': 120,
                'fee': '₹75,000 / Year',
                'eligibility': 'Pass in 10+2 with Physics, Mathematics, and Chemistry/Computer Science with minimum 60% aggregate.',
                'desc': 'A strong foundational program emphasizing algorithmic thinking, computational mathematics, operating systems, compiler design, and networking.',
                'highlights': ['Algorithms & Data Structures Studio', 'Open Source Contribution Track', 'Systems Programming in Rust & C++', 'Research Publication Mentorship'],
                'careers': ['Systems Engineer', 'Algorithm Analyst', 'Embedded Systems Developer', 'Network Engineer', 'Graduate Research Scholar']
            },
            {
                'code': 'B.Com',
                'dept': dept_comm,
                'title': 'B.Com in Computer Applications & FinTech',
                'level': 'UG',
                'duration': '3 Years (6 Semesters)',
                'seats': 120,
                'fee': '₹65,000 / Year',
                'eligibility': '10+2 Commerce or Science stream with at least 50% marks from a recognized board.',
                'desc': 'Blends corporate accounting, taxation, and international trade with Python financial modeling, SAP ERP, and blockchain technology.',
                'highlights': ['Bloomberg Terminal Simulation Lab', 'SAP ERP & Tally Certification', 'Financial Data Analytics with Python', 'Banking Sector Placements'],
                'careers': ['Financial Analyst', 'FinTech Specialist', 'ERP Consultant', 'Investment Operations Analyst', 'Tax Associate']
            },
            {
                'code': 'MCA',
                'dept': dept_ca,
                'title': 'Master of Computer Applications',
                'level': 'PG',
                'duration': '2 Years (4 Semesters)',
                'seats': 120,
                'fee': '₹1,10,000 / Year',
                'eligibility': 'Recognized Bachelor degree (BCA, B.Sc, B.Com, B.Tech) with Mathematics at 10+2 or Graduation level with minimum 50% marks (45% for reserved categories).',
                'desc': 'Premier postgraduate program focusing on enterprise cloud architecture, DevOps, cybersecurity, microservices, and AI-driven applications.',
                'highlights': ['6-Month Paid Corporate Internship', 'Advanced AI & Machine Learning Track', 'DevOps & Kubernetes Infrastructure Lab', 'Average Salary ₹9.2 LPA'],
                'careers': ['Enterprise Architect', 'DevOps Engineer', 'Senior Backend Engineer', 'Solutions Consultant', 'Data Engineer']
            },
            {
                'code': 'M.Sc',
                'dept': dept_ai,
                'title': 'M.Sc in Data Science & Artificial Intelligence',
                'level': 'PG',
                'duration': '2 Years (4 Semesters)',
                'seats': 60,
                'fee': '₹95,000 / Year',
                'eligibility': 'B.Sc (CS/Math/Stats/Physics), BCA, or B.E./B.Tech with minimum 55% marks.',
                'desc': 'Intensive master curriculum covering Deep Learning, Natural Language Processing, Computer Vision, Big Data Engineering, and Generative AI.',
                'highlights': ['Nvidia DGX AI Supercomputer Access', 'Industry Sponsored Research Grants', 'Kaggle Grandmaster Mentorship', 'Highest Package ₹32 LPA'],
                'careers': ['Machine Learning Scientist', 'Data Scientist', 'AI Research Engineer', 'Quantitative Analyst', 'NLP Specialist']
            },
            {
                'code': 'B.Tech',
                'dept': dept_cs,
                'title': 'B.Tech Computer Science & Engineering',
                'level': 'UG',
                'duration': '4 Years (8 Semesters)',
                'seats': 240,
                'fee': '₹1,40,000 / Year',
                'eligibility': '10+2 with Physics, Mathematics & Chemistry with minimum 60% aggregate, or qualifying rank in State CET / JEE Main.',
                'desc': 'Comprehensive engineering program with specializations in AI, Cybersecurity, IoT, and Cloud Native Distributed Systems.',
                'highlights': ['Industry-aligned curriculum with IBM & Intel', 'Hackathons & Startup Incubator', 'Dual Degree option available', 'Top Recruiters: Google, Microsoft, Amazon'],
                'careers': ['Software Development Engineer (SDE)', 'Cloud Architect', 'Cybersecurity Analyst', 'Product Engineer', 'R&D Scientist']
            }
        ]

        for c in courses_data:
            Course.objects.update_or_create(
                code=c['code'],
                defaults={
                    'department': c['dept'],
                    'title': c['title'],
                    'degree_level': c['level'],
                    'duration': c['duration'],
                    'seats': c['seats'],
                    'annual_tuition_fee': c['fee'],
                    'eligibility': c['eligibility'],
                    'description': c['desc'],
                    'highlights': c['highlights'],
                    'career_opportunities': c['careers'],
                    'is_active': True
                }
            )

        # 4. Faculty Members
        faculty_data = [
            {
                'name': 'Dr. Aarthi Natarajan',
                'desig': 'Principal & Professor',
                'dept': dept_cs,
                'qual': 'Ph.D. in Computer Science (IIT Madras)',
                'spec': 'Distributed Algorithms & High-Performance Computing',
                'exp': 22,
                'email': 'principal@cit.edu.in'
            },
            {
                'name': 'Dr. Vikram Seth',
                'desig': 'Dean of Academics & Professor',
                'dept': dept_cs,
                'qual': 'Ph.D. in Software Engineering (IISc Bengaluru)',
                'spec': 'Formal Methods, Cloud Systems & Compiler Design',
                'exp': 18,
                'email': 'dean.academics@cit.edu.in'
            },
            {
                'name': 'Dr. Shalini Mukherjee',
                'desig': 'Professor & Head of Department',
                'dept': dept_ca,
                'qual': 'Ph.D. in Information Systems (Anna University)',
                'spec': 'Cloud Architectures, Full Stack Design & Web Security',
                'exp': 16,
                'email': 'hod.ca@cit.edu.in'
            },
            {
                'name': 'Dr. Preeti Deshmukh',
                'desig': 'Professor & Head of Department',
                'dept': dept_ai,
                'qual': 'Ph.D. in Machine Learning (NIT Trichy)',
                'spec': 'Deep Learning, NLP & Autonomous Systems',
                'exp': 15,
                'email': 'hod.aids@cit.edu.in'
            },
            {
                'name': 'Prof. Rajesh K. Varma',
                'desig': 'Associate Professor',
                'dept': dept_ca,
                'qual': 'M.Tech, Ph.D. (Pursuing - BITS Pilani)',
                'spec': 'Mobile Enterprise Apps, React Native & Microservices',
                'exp': 12,
                'email': 'rajesh.varma@cit.edu.in'
            },
            {
                'name': 'Prof. Arvind Swaminathan',
                'desig': 'Director of Corporate Relations & Placements',
                'dept': dept_cs,
                'qual': 'M.S. in Computer Science (Univ of Texas), MBA',
                'spec': 'Corporate Strategy, Tech Talent Development & Industry Partnerships',
                'exp': 19,
                'email': 'placements@cit.edu.in'
            }
        ]

        for f in faculty_data:
            FacultyMember.objects.update_or_create(
                name=f['name'],
                defaults={
                    'designation': f['desig'],
                    'department': f['dept'],
                    'qualification': f['qual'],
                    'specialization': f['spec'],
                    'experience_years': f['exp'],
                    'email': f['email']
                }
            )

        # 5. Campus Facilities
        facilities = [
            {
                'title': 'CIT Catalyst Innovation Hub',
                'cat': 'Innovation & Incubation',
                'short': '15,000 sq.ft state-of-the-art incubation center funded with ₹2 Crore seed grant.',
                'details': 'Equipped with Nvidia DGX AI Supercomputing stations, prototyping lab with 3D printers, IoT testbenches, and venture mentoring rooms. Over 14 student startups currently incubated.',
                'icon': 'Lightbulb'
            },
            {
                'title': 'Dr. APJ Abdul Kalam Central Library',
                'cat': 'Academic Resource',
                'short': 'Fully automated RFID-enabled library spanning 3 floors with 45,000+ volumes.',
                'details': 'Subscribes to IEEE Xplore, ACM Digital Library, SpringerLink, and ScienceDirect. Features 200 high-speed computers in the Digital Knowledge Centre, 24/7 quiet study reading rooms, and collaborative multimedia discussion cubicles.',
                'icon': 'BookOpen'
            },
            {
                'title': 'Cauvery (Boys) & Ganga (Girls) Hostels',
                'cat': 'Residential Campus',
                'short': 'Modern on-campus student residences with AC & Non-AC room choices and biometric security.',
                'details': 'Accommodation available in 2-sharing, 3-sharing, and 4-sharing configurations. Facilities include high-speed Wi-Fi 6, 24/7 uninterrupted power backup, solar hot water, modern gym, indoor games lounge (pool, table tennis), laundromat, and 24/7 resident medical officer.',
                'icon': 'Home'
            },
            {
                'title': 'Advanced Robotics & AI Research Lab',
                'cat': 'Research Facilities',
                'short': 'Multi-million rupee specialized center for autonomous systems and cobot engineering.',
                'details': 'Equipped with 6-axis robotic arms, automated guided vehicle (AGV) platforms, drone testing safety cage, stereoscopic depth cameras, and edge AI kits (Nvidia Jetson Orin).',
                'icon': 'Cpu'
            },
            {
                'title': 'Olympic Standard Sports Arena',
                'cat': 'Sports & Recreation',
                'short': 'State-of-the-art outdoor and indoor sporting complex spanning 10 acres.',
                'details': 'Includes a 400m synthetic running track, floodlit cricket pitch, FIFA-standard football ground, two FIBA basketball courts, four synthetic badminton courts, volleyball courts, and modern weightlifting gymnasium.',
                'icon': 'Trophy'
            },
            {
                'title': 'Multi-Cuisine Food Court & Cafeteria',
                'cat': 'Dining & Health',
                'short': 'ISO 22000 certified hygienic food court with seating for 800 students.',
                'details': 'Offers nutritious South Indian thali, North Indian delicacies, continental meals, fresh cold-pressed juices, and bakery items at student-subsidized rates. Strict nutrition and hygiene audits maintained daily.',
                'icon': 'Coffee'
            }
        ]

        for fac in facilities:
            CampusFacility.objects.update_or_create(
                title=fac['title'],
                defaults={
                    'category': fac['cat'],
                    'short_description': fac['short'],
                    'details': fac['details'],
                    'icon': fac['icon']
                }
            )

        # 6. Events & News
        events = [
            {
                'title': 'INNOVATIA 2026: 36-Hour National Hackathon',
                'type': 'EVENT',
                'date': 'March 28-29, 2026',
                'venue': 'CIT Catalyst Innovation Arena',
                'summary': 'The biggest national student hackathon with ₹5,00,000 cash prizes, sponsored by Google Cloud and Microsoft.',
                'content': 'Over 250 shortlisted teams from across India will compete across 5 tracks: Generative AI for Social Good, Cyber Defense, GreenTech & Sustainability, HealthTech, and Decentralized Finance. Mentors from top tech corporations will guide participants on-site.'
            },
            {
                'title': 'Campus Placement Drive 2025-26 Hits Record 96.4%',
                'type': 'NEWS',
                'date': 'February 10, 2026',
                'venue': 'Auditorium Block A',
                'summary': 'Highest salary package offered reaches ₹44.5 LPA at Microsoft; 180+ global tech recruiters participated.',
                'content': 'CIT achieved a remarkable milestone this placement season with over 96.4% of eligible students placed before graduation. Average annual salary package rose to ₹7.8 LPA. Over 45 marquee companies, including Google, Atlassian, Amazon, Zoho, and Cisco offered day-one super-dream offers.'
            },
            {
                'title': 'FIESTA 2026: Annual Inter-Collegiate Cultural Carnival',
                'type': 'EVENT',
                'date': 'April 15-17, 2026',
                'venue': 'CIT Open Air Amphitheatre',
                'summary': 'Three days of music, dance, theater, fashion shows, and celebrity musical concerts.',
                'content': 'FIESTA 2026 brings together over 40 colleges across the state. Highlights include Battle of the Bands, Pro-Nite EDM concert, classical dance symposium, street plays, and art exhibitions.'
            },
            {
                'title': 'CIT Admissions 2026 Open: Apply for CIT-AST Scholarship Test',
                'type': 'NEWS',
                'date': 'January 15, 2026',
                'venue': 'Admissions Block',
                'summary': 'Online and offline applications open for BCA, B.Sc, B.Com, MCA, M.Sc, and B.Tech programs.',
                'content': 'The admissions committee has officially opened applications for the 2026-27 academic session. Early applicants can register for the CIT Aptitude & Scholarship Test (CIT-AST) to qualify for up to 100% tuition fee waivers.'
            }
        ]

        for ev in events:
            EventNews.objects.update_or_create(
                title=ev['title'],
                defaults={
                    'item_type': ev['type'],
                    'date_str': ev['date'],
                    'venue': ev['venue'],
                    'summary': ev['summary'],
                    'content': ev['content'],
                    'is_featured': True
                }
            )

        # 7. Comprehensive Knowledge Base Entries for RAG
        kb_entries = [
            {
                'title': 'CIT Overview, Accreditation & Campus Location',
                'cat': 'About CIT',
                'url': '/about',
                'text': """College of Innovative Technology (CIT) was established in 2004 as an autonomous institution dedicated to academic excellence, innovation, and holistic development.
Motto: Learn • Innovate • Grow.
Key Accreditations:
- NAAC 'A++' Grade with 3.82 CGPA.
- Approved by All India Council for Technical Education (AICTE), New Delhi.
- NBA Accredited for BCA, B.Sc Computer Science, and MCA programs.
- Ranked #18 among Top Private Emerging Tech Colleges in India (NIRF band 51-100).
Campus: 55-acre smart green campus equipped with solar power, 10 Gbps fiber backbone, smart classrooms, and zero-carbon waste management.
Location: CIT Campus, Tech Enclave Road, Cyber Innovation Corridor, Pin - 560100.
Nearest landmark: CIT Metro Station (Line 3, Gate 2 - 400m walk). 35 minutes from Cyber City International Airport."""
            },
            {
                'title': 'Admissions 2026-27: Eligibility, Dates & Application Process',
                'cat': 'Admissions',
                'url': '/admissions',
                'text': """Admissions for Academic Year 2026-27 are now officially open.
Key Dates:
- Application portal opens: March 1, 2026
- Early Bird Application Deadline: May 15, 2026
- CIT-AST (Aptitude & Scholarship Test) Round 1: May 24, 2026
- Regular Application Deadline: June 30, 2026
- CIT-AST Round 2: July 12, 2026
- Academic Orientation & Classes Begin: August 10, 2026
Application Procedure:
1. Apply online at the official portal or submit physical forms at CIT Admissions Office (Counter 4, Admin Block).
2. Application fee: ₹500 (non-refundable).
3. Upload 10th and 12th marksheets, transfer certificate, and identification proof.
4. Shortlisted applicants will receive interview / test schedule via email and SMS.
Helpline: +91 44 2855 1000 / +91 98401 23456. Email: admissions@cit.edu.in."""
            },
            {
                'title': 'Annual Fee Structure & Payment Policies',
                'cat': 'Fees',
                'url': '/admissions',
                'text': """Official Fee Structure for 2026-27 (Annual Tuition):
- BCA (Bachelor of Computer Applications): ₹85,000 per year
- B.Sc (Computer Science): ₹75,000 per year
- B.Sc (Data Science & AI): ₹90,000 per year
- B.Com (Computer Applications & FinTech): ₹65,000 per year
- MCA (Master of Computer Applications): ₹1,10,000 per year
- M.Sc (Data Analytics / Cyber Security): ₹95,000 per year
- B.Tech (Computer Science & Engineering): ₹1,40,000 per year
Additional One-Time / Annual Fees:
- One-time Admission & Registration Fee: ₹10,000 (at time of joining)
- Annual Examination & University Affiliation Fee: ₹6,000 / year
- Annual Laboratory & Library Access Fee: ₹10,000 / year
- Caution Deposit (Refundable): ₹5,000
Payment Options: Fees can be paid semester-wise in 2 installments (July and December). Zero-interest EMI options available with partner banks (HDFC, SBI, ICICI)."""
            },
            {
                'title': 'Scholarships & Financial Assistance',
                'cat': 'Scholarships',
                'url': '/admissions',
                'text': """CIT provides merit-based and need-based scholarships worth ₹1.5 Crore annually:
1. Founder's Merit Scholarship: 100% tuition fee waiver for students with >95% marks in 12th grade or qualifying degree.
2. CIT-AST Top Rankers: Top 25 scorers in the CIT Aptitude & Scholarship Test receive 50% to 75% tuition fee waiver.
3. Tech Innovator & Hackathon Award: 50% tuition waiver for students who have won state or national level hackathons/coding competitions.
4. Sports Excellence Scholarship: 25% to 100% waiver for medalists in state/national sports tournaments.
5. Need-Based Financial Aid: Up to 50% fee concession for deserving students with family annual income under ₹3.0 Lakhs.
How to apply: Submit scholarship application form along with income/merit certificates during admissions round."""
            },
            {
                'title': 'Bachelor of Computer Applications (BCA) Program Details',
                'cat': 'Academics',
                'url': '/academics',
                'text': """Course: Bachelor of Computer Applications (BCA)
Duration: 3 Years (6 Semesters)
Intake: 180 seats across 3 sections
Eligibility: 10+2 with Mathematics, Business Maths, or Computer Science with min 55% marks.
Annual Tuition: ₹85,000 / Year
Curriculum Highlights:
- Year 1: Python Programming, Data Structures, Web Design (HTML5/CSS3/JavaScript), Computer Organization, Relational Databases (MySQL/PostgreSQL).
- Year 2: Object-Oriented Programming (Java/C++), Full Stack Development (React & Node.js), Operating Systems, Computer Networks, Software Engineering.
- Year 3: Cloud Computing (AWS/Azure), Cyber Security Fundamentals, Mobile App Development (Flutter), Agile Methodology, Capstone Industry Project.
Placements for BCA: 98% placement rate. Top employers: TCS, Cognizant, Infosys, Zoho, Wipro, Capgemini. Average package: ₹5.8 LPA."""
            },
            {
                'title': 'Master of Computer Applications (MCA) Program Details',
                'cat': 'Academics',
                'url': '/academics',
                'text': """Course: Master of Computer Applications (MCA)
Duration: 2 Years (4 Semesters)
Intake: 120 seats
Eligibility: Recognized Bachelor degree (BCA, B.Sc CS, B.Com, B.Tech) with Mathematics at 10+2 or Bachelor level with minimum 50% aggregate marks.
Annual Tuition: ₹1,10,000 / Year
Curriculum Highlights:
- Semester 1 & 2: Advanced Data Structures & Algorithms, Enterprise Cloud Architecture, Distributed Databases, Python for AI & Data Science, DevOps & CI/CD Pipelines.
- Semester 3: Microservices, Container Orchestration (Docker & Kubernetes), Deep Learning, Full Stack Next.js & Spring Boot, Electives (FinTech / Blockchain / IoT).
- Semester 4: Mandatory 6-Month Full-Time Paid Corporate Internship and Dissertation.
Placements for MCA: Average CTC ₹9.2 LPA. Highest CTC ₹32 LPA. Top recruiters: Amazon, Atlassian, Cisco, Microsoft, SAP Labs."""
            },
            {
                'title': 'Campus Placements, Highest Package & Recruiters',
                'cat': 'Placements',
                'url': '/placements',
                'text': """CIT Placement Cell (Corporate Relations Center - CRC) Records (2024-2025):
- Overall Placement Rate: 96.4%
- Highest Salary Package Offered: ₹44.5 LPA (Offered by Microsoft & Atlassian)
- Top 10% Average Package: ₹18.2 LPA
- Overall College Average Package: ₹7.8 LPA
- Total Recruiting Companies: 180+ companies visited campus
- Total Job Offers: 620+ offers extended to graduating batch
Marquee Recruiters: Microsoft, Google, Amazon, Atlassian, Cisco, Zoho, TCS Ninja & Digital, Infosys, Wipro, Cognizant, Dell Technologies, Accenture, IBM, Oracle, HCL Tech.
Placement Training:
From Semester 3 onwards, all students undergo 200+ hours of rigorous technical training (Data Structures, LeetCode style problem-solving, System Design), Aptitude & Logical Reasoning, and Soft Skills & Mock Interviews with corporate leaders."""
            },
            {
                'title': 'Hostel Accommodation, Amenities & Mess Fees',
                'cat': 'Hostel & Facilities',
                'url': '/student-life',
                'text': """CIT provides safe, comfortable on-campus residences:
- Cauvery Hostel for Boys (Capacity: 900 beds)
- Ganga Hostel for Girls (Capacity: 750 beds)
Room Types & Annual Fees (inclusive of lodging, 4-times daily nutritious mess food, electricity & water):
- 3-Sharing Non-AC Room: ₹75,000 per year
- 2-Sharing Non-AC Room: ₹90,000 per year
- 2-Sharing AC Room: ₹1,20,000 per year
- Caution Deposit (Refundable): ₹10,000
Amenities included:
- High-speed dual-band Wi-Fi in every room
- 24/7 power backup with soundproof diesel generators
- Solar water heaters & RO drinking water on all floors
- Fully equipped gym and indoor recreation rooms (table tennis, pool, carrom, chess)
- Modern coin-operated laundromat
- 24/7 CCTV surveillance, biometric access entry, and round-the-clock security guards
- Resident Doctor and 24/7 emergency ambulance on campus."""
            },
            {
                'title': 'Campus Facilities, Labs, Library & Sports Arena',
                'cat': 'Facilities',
                'url': '/student-life',
                'text': """CIT Campus Facilities include:
1. CIT Catalyst Innovation Hub: 15,000 sq.ft facility with Nvidia DGX supercomputing node, 3D printing lab, electronics assembly workbenches, and ₹2 Crore seed funding for student ventures.
2. Dr. APJ Abdul Kalam Central Library: 3 floors, 45,000+ technical and reference volumes, IEEE Xplore, ACM Digital Library subscriptions, 200-station Digital Knowledge Centre, 24/7 reading hall.
3. High-Tech Computing Labs: 12 specialized computer labs with 1,200+ high-end workstations, Apple Mac Studio design lab, and dedicated Cisco Networking Academy.
4. Sports Arena: 400m synthetic running track, floodlit cricket ground, FIFA standard football turf, 2 synthetic basketball courts, 4 indoor badminton courts, gym.
5. Multi-Cuisine Food Court: 800-seat ISO 22000 certified hygienic cafeteria serving South Indian, North Indian, fresh juices, and bakery snacks."""
            },
            {
                'title': 'Student Clubs, Cultural Events & Innovatia Hackathon',
                'cat': 'Student Life',
                'url': '/student-life',
                'text': """Vibrant campus life with 18+ active student clubs:
- Technical Clubs: Google Developer Student Club (GDSC CIT), CodeCIT (Competitive Programming), CyberKnights (Ethical Hacking & InfoSec), Robotics & Automation Guild (RAG).
- Cultural & Arts: Chrysalis (Drama & Theatre), Symphony (Western & Classical Music Band), Natya (Dance Troupe), Fine Arts Society.
- Social & Leadership: Rotaract Club of CIT, Eco-Warriors Environmental Club, National Cadet Corps (NCC), Youth Red Cross (YRC).
Flagship Annual Festivals:
- INNOVATIA: 36-hour National Hackathon in March with ₹5,00,000 in prizes and 1,000+ participants.
- FIESTA: 3-day inter-collegiate cultural fest featuring EDM pro-nites, rock concerts, and arts competitions.
- CIT KREEDA: Annual inter-university sports tournament with cricket, football, basketball, and athletics."""
            },
            {
                'title': 'College Contact Information, Office Timings & Directions',
                'cat': 'Contact',
                'url': '/contact',
                'text': """CIT - College of Innovative Technology Contact Details:
Address: CIT Campus, Tech Enclave Road, Cyber Innovation Corridor, Pin - 560100.
Admissions Hotline: +91 44 2855 1000 / +91 98401 23456
Admissions Email: admissions@cit.edu.in
General Information: info@cit.edu.in
Principal Office: principal@cit.edu.in
Placement Office: placements@cit.edu.in
Office Working Hours:
- Monday to Saturday: 9:00 AM to 5:00 PM
- Admissions Enquiry Counter: Open on all weekdays and Saturdays (9:00 AM - 4:30 PM). Closed on 2nd Saturdays and national holidays.
How to Reach:
- By Metro: 400 meters from CIT Metro Station (Line 3, Gate 2).
- By Bus: Route numbers 45B, 119C, 570A stop directly at CIT Main Gate.
- By Airport: 35 minutes via Expressway from Cyber City International Airport."""
            }
        ]

        for entry_info in kb_entries:
            entry, created = KnowledgeEntry.objects.update_or_create(
                title=entry_info['title'],
                defaults={
                    'category': entry_info['cat'],
                    'text': entry_info['text'],
                    'source_url': entry_info['url'],
                    'is_active': True
                }
            )
            # Create chunks (split roughly by 500 characters)
            KnowledgeChunk.objects.filter(entry=entry).delete()
            paragraphs = [p.strip() for p in entry_info['text'].split('\n\n') if p.strip()]
            for pos, para in enumerate(paragraphs):
                KnowledgeChunk.objects.create(
                    entry=entry,
                    chunk_text=para,
                    position=pos
                )

        self.stdout.write(self.style.SUCCESS("Successfully seeded comprehensive imaginary college data for CIT!"))
