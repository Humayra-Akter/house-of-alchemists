### Project Motive (Why This Project Exists)
Democratize chemistry education in Bangladesh (SSC, HSC, Admission level)
Provide structured, smart learning resources (PDFs, YouTube, Notes)
Enable real-time testing with anti-cheat and performance tracking
Create a community-driven Q&A environment (like StackOverflow for students)
Offer teachers/admins full control over content and exams
Build a centralized portal for both students and admins with intuitive UI/UX

### Admin Side
Dashboard analytics for student activity, exams, and content
Manage educational resources (Class → Paper → Chapter → Content)
Create and manage exams with detailed question input
View and moderate student questions and answers (blogs)
View all students, their profiles, and exam performances

### Student Side Features
Personalized dashboard (class, upcoming exams, doubts)
Read-only access to resources, filtered by class
Participate in exams with smart anti-cheat mechanisms
Ask questions and contribute to the blog/discussion board
View past exam results with answer breakdown and explanations
View/edit their profile info

### UI/UX + Frontend (React + Tailwind)
Design clean responsive layouts (Admin & Student portals)
Implement tabbed and accordion-based navigation (Class > Paper > Chapter)
Create custom components: <ResourceCard>, <PDFViewer>, <YouTubeEmbed>, etc.
Handle form inputs (Exams, Questions, Blogs)

### Backend (Node.js + Express)
Build RESTful APIs for users, resources, exams, blogs, results
Implement logic for tab-switch detection, exam resume control
Connect to MongoDB (use schemas from the design)
Integrate Firebase Auth for role-based access

### Database (MongoDB)
Set up 8 collections: User, ClassPaper, Resource, Exam, Question, Result, Blog, Comment
Maintain relationships between collections (e.g., Resource linked to Chapters)
Optimize for read-heavy access (e.g., blog reads, content views)

### Auth & Storage
Use Firebase Authentication for login/signup (email/password)
Use Cloudinary or Firebase Storage for storing PDFs/images
Ensure secure file access (read-only for students, editable for admin)
