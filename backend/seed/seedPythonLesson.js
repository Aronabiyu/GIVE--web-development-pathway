const path = require('path');

const envPath = path.join(__dirname, '../.env');
require('dotenv').config({ path: envPath });

console.log('Environment file path:', envPath);
console.log('MONGO_URI loaded?', !!process.env.MONGO_URI);

if (!process.env.MONGO_URI) {
    console.error(' ERROR: MONGO_URI is not defined!');
    process.exit(1);
}

const mongoose = require('mongoose');
const Lesson = require('../src/models/Lesson');
const pythonLessonData = {
    topic: "Python",
    slug: "python", 
    sections: [
        {
            title: 'Lesson 1: Introduction to Python',
            anchor: 'intro-python',
            content: `Python is a high-level, interpreted programming language known for its readability and versatility. It supports multiple programming paradigms, including procedural, object-oriented, and functional programming. Python's extensive standard library and large ecosystem of third-party packages make it suitable for a wide range of applications, from web development to data science and artificial intelligence.`
        },
        {title: 'Lesson 2: Python Basics',
            anchor: 'python-basics',
            content: `Python syntax is designed to be clean and easy to understand. It uses indentation to define code blocks, which enhances readability. Key features of Python syntax include the use of colons to start blocks, dynamic typing, and a variety of built-in data types such as lists, tuples, and dictionaries. Understanding Python syntax is essential for writing effective code and building applications.`},

         {title: 'Lesson 3: Functions and Modules in Python',
            anchor: 'python-functions-modules',
            content: `Functions in Python are defined using the def keyword and can take parameters and return values. They help organize code into reusable blocks, making it easier to read and maintain. Modules are files containing Python code that can define functions, classes, and variables. They allow for code organization and reuse across different programs by importing the module where needed.`},
    
         {
        title: 'Lesson 4: Working with Data in Python',
         anchor: 'python-working-with-data',
         content: `Python provides powerful tools for working with data, including built-in data structures like lists, dictionaries, and sets. Additionally, libraries such as NumPy and pandas offer advanced capabilities for data manipulation and analysis. Python's simplicity and extensive ecosystem make it a popular choice for data science and analytics tasks.`}

    ]
};


const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding for JavaScript...');
    console.log('Mongoose version:', mongoose.version);
    
    await mongoose.connect(process.env.MONGO_URI);
    
    console.log('✅ MongoDB connected successfully');

    
    const deleteResult = await Lesson.deleteMany({ 
        $or: [
            { slug: 'python' },
            { slug: 'Python' },
            { slug: 'PYTHON' }
        ]
    });
    console.log(`🗑️ Deleted ${deleteResult.deletedCount} existing python lessons`);
    
    // Create new lesson
    const pythonLesson = new Lesson(pythonLessonData);
    await pythonLesson.save();
    
    console.log('✅ Python lesson seeded successfully!');
    console.log(`📚 Lesson ID: ${pythonLesson._id}`);
    console.log(`🔗 Slug: ${pythonLesson.slug}`);
    console.log(`📖 Sections: ${pythonLesson.sections.length}`);
    
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
            