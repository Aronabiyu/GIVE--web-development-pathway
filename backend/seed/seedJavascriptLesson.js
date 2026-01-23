// seed/seedJavascriptLesson.js
const path = require('path');

const envPath = path.join(__dirname, '../.env');
require('dotenv').config({ path: envPath });

console.log('Environment file path:', envPath);
console.log('MONGO_URI loaded?', !!process.env.MONGO_URI);

if (!process.env.MONGO_URI) {
    console.error('❌ ERROR: MONGO_URI is not defined!');
    process.exit(1);
}

const mongoose = require('mongoose');
const Lesson = require('../src/models/Lesson');

const JavascriptLessonData = {
    topic: "JavaScript",
    slug: "javascript", // Changed from 'javaScript' to lowercase for consistency
    sections: [
        {
            title: 'Lesson 1: Introduction to JavaScript',
            anchor: 'intro-javascript',
            content: `JavaScript is a versatile, high-level programming language primarily used for enhancing interactivity and functionality on websites. It is a core technology of the World Wide Web, alongside HTML and CSS. JavaScript enables developers to create dynamic content that can respond to user actions, manipulate the Document Object Model (DOM), and communicate with servers asynchronously.`
        },
        {
            title: 'Lesson 2: JavaScript Basics',
            anchor: 'javascript-basics',
            content: `JavaScript syntax is the set of rules that define how JavaScript code is written and interpreted. It includes the use of variables, data types, operators, control structures (like loops and conditionals), functions, and objects. Understanding JavaScript syntax is essential for writing effective code and building interactive web applications.`
        },
        {
            title: 'Lesson 3: Functions and Events in JavaScript',
            anchor: 'javascript-functions-events',
            content: `Functions are reusable blocks of code that perform specific tasks. They can take inputs (parameters) and return outputs (values). Events are actions or occurrences that happen in the system, such as user interactions (clicks, key presses) or browser events (page load). JavaScript uses event listeners to respond to these events, allowing developers to create interactive web experiences.`
        },
        {
            title: 'Lesson 4: DOM Manipulation with JavaScript',
            anchor: 'javascript-dom-manipulation',
            content: `The Document Object Model (DOM) is a programming interface for web documents. It represents the structure of a webpage as a tree of objects, allowing JavaScript to access and manipulate HTML elements and their attributes. DOM manipulation involves selecting elements, changing their content or styles, adding or removing elements, and responding to user interactions to create dynamic web pages.`
        }
    ]
};

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding for JavaScript...');
    console.log('Mongoose version:', mongoose.version);
    
    await mongoose.connect(process.env.MONGO_URI);
    
    console.log('✅ MongoDB connected successfully');

    // Clear existing JavaScript lesson (case insensitive)
    const deleteResult = await Lesson.deleteMany({ 
        $or: [
            { slug: 'javascript' },
            { slug: 'javaScript' },
            { slug: 'JavaScript' }
        ]
    });
    console.log(`🗑️ Deleted ${deleteResult.deletedCount} existing JavaScript lessons`);
    
    // Create new lesson
    const javascriptLesson = new Lesson(JavascriptLessonData);
    await javascriptLesson.save();
    
    console.log('✅ JavaScript lesson seeded successfully!');
    console.log(`📚 Lesson ID: ${javascriptLesson._id}`);
    console.log(`🔗 Slug: ${javascriptLesson.slug}`);
    console.log(`📖 Sections: ${javascriptLesson.sections.length}`);
    
    // List all lessons
    const allLessons = await Lesson.find({}, 'topic slug sections');
    console.log('\n📋 All lessons in database:');
    allLessons.forEach(lesson => {
        console.log(`   - ${lesson.topic} (${lesson.slug}): ${lesson.sections?.length || 0} sections`);
    });
    
  } catch (error) {
    console.error('❌ SEEDING FAILED:', error.message);
    console.error('Full error:', error);
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log('🔌 Connection closed');
    }
    process.exit(0);
  }
};

seedDatabase();