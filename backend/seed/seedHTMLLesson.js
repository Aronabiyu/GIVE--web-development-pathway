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

const HTMLLessonData = {
    topic: "HTML",
    slug: "HTML",
    sections: [ {
        title:'Lesson 1: Introduction to HTML',
        anchor:'intro-html',
        content:`HTML, or HyperText Markup Language, is the standard language used to create and structure content on the web. Unlike programming languages that have logical conditions or loops, HTML is a markup language; its primary purpose is to describe the structure and presentation of content. When you open a webpage, the text, images, links, tables, and other elements you see are all organized and formatted using HTML.
HTML is based on the concept of elements. These elements represent different parts of a webpage, such as headings, paragraphs, lists, links, images, and more. Each element tells the browser how to display the content. For instance, a paragraph element ensures that the text appears as a paragraph, with proper spacing before and after.
A basic HTML document has a structure that looks like this: a declaration specifying the HTML version, followed by a root html element, a head section containing metadata (like the page title or character encoding), and a body section containing the content visible to users. Understanding this structure is essential for creating any webpage.
HTML is universal: all modern web browsers understand and render HTML. It serves as the foundation upon which CSS (Cascading Style Sheets) and JavaScript are applied, which are responsible for styling and dynamic behavior respectively.`
    },{
        title:'Lesson 2: HTML Elements and Structure',
        anchor:'html-elements-structure',
        content:`HTML elements are the building blocks of web pages. They are defined by tags, which are enclosed in angle brackets. Most HTML elements have an opening tag and a closing tag, with content in between. For example, the paragraph element is represented by <p> for the opening tag and </p> for the closing tag.
Elements can also have attributes, which provide additional information about the element. Attributes are included in the opening tag and usually come in name-value pairs. For instance, the href attribute in an anchor (<a>) element specifies the URL of the link destination.
HTML documents have a hierarchical structure, meaning elements can be nested within other elements. This nesting creates a parent-child relationship that defines how elements relate to each other on the page. For example, a list (<ul> or <ol>) contains list items (<li>) as its children.
Common HTML elements include headings (<h1> to <h6>), paragraphs`
    },
{
        title:'Lesson 3: HTML Forms and Input Elements',
        anchor:'html-forms-inputs',
        content:`HTML forms are used to collect user input. The <form> element defines the form, and various input elements like <input>, <textarea>, and <select> are used to create different types of form fields.
Input elements can have different types, such as text, password, email, number, checkbox, radio button, and submit. Each type has specific behavior and validation rules.
The name attribute is crucial for form data submission. It identifies the field when the form is submitted to a server.
Understanding how to create and manage forms is essential for interactive web pages where user input is required.`}]};

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    console.log('Mongoose version:', mongoose.version);
    
    // Connect to MongoDB - MODERN SYNTAX (no options needed)
    await mongoose.connect(process.env.MONGO_URI);
    
    console.log('✅ MongoDB connected successfully');

    // Clear existing HTML lesson
    const deleteResult = await Lesson.deleteMany({ slug: 'HTML' });
    console.log(`🗑️ Deleted ${deleteResult.deletedCount} existing HTML lessons`);
    
    // Create new lesson
    const htmlLesson = new Lesson(HTMLLessonData);
    await htmlLesson.save();
    
    console.log('✅ HTML lesson seeded successfully!');
    console.log(`📚 Lesson ID: ${htmlLesson._id}`);
    console.log(`🔗 Slug: ${htmlLesson.slug}`);
    console.log(`📖 Sections: ${htmlLesson.sections.length}`);
    
    
    const verifyLesson = await Lesson.findOne({ slug: 'html' });
    console.log(`✅ Verification: Found lesson "${verifyLesson.topic}" with ${verifyLesson.sections.length} sections`);
    
  } catch (error) {
    console.error('❌ SEEDING FAILED:', error.message);
    console.error('Full error:', error);
    
    if (error.message.includes('timed out')) {
      console.log('\n💡 TROUBLESHOOTING:');
      console.log('1. Check your internet connection');
      console.log('2. Make sure MongoDB Atlas cluster is running');
      console.log('3. Whitelist your IP in MongoDB Atlas:');
      console.log('   - Go to MongoDB Atlas → Network Access');
      console.log('   - Click "Add IP Address"');
      console.log('   - Add "0.0.0.0/0" for all IPs (less secure)');
      console.log('   - Or add your current IP');
    }
    
    if (error.message.includes('bad auth') || error.message.includes('Authentication failed')) {
      console.log('\n🔑 Authentication error - check:');
      console.log('1. Username: nad_db_user');
      console.log('2. Password is correct');
      console.log('3. User has proper permissions in MongoDB Atlas');
    }
    
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log('🔌 Connection closed');
    }
    process.exit(0);
  }
};

seedDatabase();