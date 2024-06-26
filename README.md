# kendricklawton.com

Welcome to my developer portfolio built with Next.js!

## Tech Stack
- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: Material-UI (MUI)
- **Generative AI**: Gemini AI Vertex API 

## Getting Started
To get started with this project, follow these steps:

1. **Install Node.js:** Download and install Node.js from the official website (https://nodejs.org/). This will also install npm.

2. **Clone Repository:**
    ```
    git clone https://github.com/machinename/kendricklawton.com.git
    cd machine_name
    ```
3. **Install Dependencies:**
    ```
    npm install
    ```
4. **Firebase Setup:**
    - Create a Firebase account and project from the official website (https://firebase.google.com/).
    - Add a Web app to your Firebase project and obtain its Firebase configuration keys under project settings.
    - Enable Firebase Vertex AI Gemini API in the Firebase Console.

5. **Configure Environment Variables:**
    - Create a `.env` file in the root directory of your Next.js project.
    - Add the following Firebase configuration keys to the `.env` file:
    ```
    FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
    FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
    FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
    FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
    FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
    FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID
    FIREBASE_MEASUREMENT_ID=YOUR_FIREBASE_MEASUREMENT_ID
    ```
      - Ensure that you include the `.env` file in your `.gitignore` file to prevent sensitive information from being committed to your version control system.

6. **Run Project:**
    ```bash
    npm run dev
    ```

7. **Open In Your Browser:**
    Open [http://localhost:3000](http://localhost:3000) to view the project in your browser. The page will auto-update as you edit the files.

### Customization
Feel free to customize and extend the project according to your preferences. You can modify pages, components, styles, and even integrate additional features or libraries as needed.

### Deployment
When you're ready to deploy the project to production, you can use platforms like Vercel, Netlify, or Firebase Hosting. Make sure to configure your deployment settings and environment variables accordingly.

### License
This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute the code as per the terms of the license.
