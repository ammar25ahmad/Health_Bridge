import mongoose from 'mongoose';
import User from './models/User.js';
import Resource from './models/Resource.js';
import Article from './models/Article.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/healthbridge';

const seedUsers = [
  { name: 'Admin User', email: 'admin@healthbridge.local', password: 'demo123', role: 'ADMIN' },
  { name: 'Health Organization', email: 'organization@healthbridge.local', password: 'demo123', role: 'ORGANIZATION' },
  { name: 'John Citizen', email: 'citizen@healthbridge.local', password: 'demo123', role: 'CITIZEN' },
];

const seedResources = [
  {
    name: 'City Community Vaccination Center',
    category: 'Vaccination Centers',
    description: 'Provides free vaccination services for children and adults. Walk-in appointments available for flu shots and routine immunizations.',
    location: '123 Health Street, Downtown',
    contactInformation: '+1-555-0101',
    availability: 'Mon-Fri 8AM-5PM',
    status: 'APPROVED',
    analysis: { category: 'Vaccination', resourceType: 'Community Health Resource', relevanceScore: 0.94 },
  },
  {
    name: 'Riverside Community Clinic',
    category: 'Clinics',
    description: 'Full-service community clinic offering primary care, pediatrics, and women\'s health services. Sliding scale fees available.',
    location: '456 River Road, Midtown',
    contactInformation: '+1-555-0102',
    availability: 'Mon-Sat 7AM-7PM',
    status: 'APPROVED',
    analysis: { category: 'Clinics', resourceType: 'Primary Care Facility', relevanceScore: 0.92 },
  },
  {
    name: 'MindWell Mental Wellness Center',
    category: 'Mental Wellness',
    description: 'Provides counseling services, stress management workshops, and mental health awareness programs. Confidential and supportive environment.',
    location: '789 Wellness Blvd, Eastside',
    contactInformation: '+1-555-0103',
    availability: 'Mon-Fri 9AM-6PM',
    status: 'APPROVED',
    analysis: { category: 'Mental Wellness', resourceType: 'Mental Health Support', relevanceScore: 0.88 },
  },
  {
    name: 'Preventive Health Check Center',
    category: 'Preventive Care',
    description: 'Comprehensive preventive health screenings including blood pressure, diabetes, cholesterol, and cancer screenings.',
    location: '321 Prevention Lane, Uptown',
    contactInformation: '+1-555-0104',
    availability: 'Mon-Fri 8AM-4PM',
    status: 'APPROVED',
    analysis: { category: 'Preventive Care', resourceType: 'Screening Facility', relevanceScore: 0.91 },
  },
  {
    name: 'City Emergency Services Hotline',
    category: 'Emergency Contacts',
    description: '24/7 emergency health hotline providing immediate guidance and connecting citizens with emergency medical services.',
    location: 'City-wide coverage',
    contactInformation: '911 / +1-555-0105',
    availability: '24/7',
    status: 'APPROVED',
    analysis: { category: 'Emergency', resourceType: 'Emergency Service', relevanceScore: 0.97 },
  },
  {
    name: 'Community Wellness Initiative',
    category: 'Public Health Programs',
    description: 'Community-based public health program promoting wellness through free health camps, nutrition workshops, and fitness activities.',
    location: '567 Community Center, Southside',
    contactInformation: '+1-555-0106',
    availability: 'Weekends 9AM-3PM',
    status: 'APPROVED',
    analysis: { category: 'Public Health', resourceType: 'Community Program', relevanceScore: 0.85 },
  },
];

const seedArticles = [
  {
    title: 'Understanding Vaccination Basics',
    category: 'Vaccination',
    summary: 'Learn why vaccinations are important and how they protect you and your community.',
    content: `Vaccination is one of the most effective ways to prevent infectious diseases. Vaccines work by training the immune system to recognize and fight specific pathogens.

How Vaccines Work:
When you receive a vaccine, your immune system learns to recognize the virus or bacteria. If you are exposed to the disease later, your body can fight it off quickly.

Common Vaccines:
- Flu vaccine: Recommended annually for everyone aged 6 months and older
- COVID-19 vaccines: Protect against severe illness
- Childhood vaccines: MMR, polio, diphtheria, tetanus, pertussis

Community Immunity:
When enough people in a community are vaccinated, it becomes harder for diseases to spread. This protects those who cannot be vaccinated due to medical conditions.

Where to Get Vaccinated:
Visit your local vaccination center, community clinic, or pharmacy. Many vaccines are available at no cost through public health programs.`,
    author: 'HealthBridge Medical Team',
    status: 'PUBLISHED',
    classification: { category: 'Vaccination', keywords: ['vaccine', 'vaccination', 'immune system', 'immunization', 'flu', 'booster', 'disease', 'infection', 'community immunity', 'pathogens'], qualityScore: 0.75 },
  },
  {
    title: 'Healthy Nutrition Habits for Everyone',
    category: 'Nutrition',
    summary: 'Simple guidelines for maintaining a balanced diet and healthy eating habits.',
    content: `Good nutrition is the foundation of good health. A balanced diet provides your body with the nutrients it needs to function properly.

Key Principles of Healthy Eating:
1. Eat a variety of foods from all food groups
2. Choose whole grains over refined grains
3. Include fruits and vegetables in every meal
4. Choose lean proteins like fish, chicken, beans, and nuts
5. Limit processed foods, added sugars, and excessive salt

Daily Recommendations:
- Fruits and vegetables: At least 5 servings per day
- Water: 6-8 glasses per day
- Fiber: 25-30 grams per day
- Limit sodium to less than 2,300 mg per day

Practical Tips:
- Plan your meals ahead of time
- Cook at home more often
- Read nutrition labels
- Don't skip breakfast
- Practice portion control

Remember: Healthy eating is about balance and moderation, not strict restrictions.`,
    author: 'HealthBridge Nutrition Team',
    status: 'PUBLISHED',
    classification: { category: 'Nutrition', keywords: ['nutrition', 'diet', 'food', 'protein', 'fiber', 'vitamin', 'calories', 'meal', 'eating', 'healthy'], qualityScore: 0.85 },
  },
  {
    title: 'The Importance of Hand Hygiene',
    category: 'Hygiene',
    summary: 'Why washing your hands properly is one of the most important things you can do for your health.',
    content: `Hand hygiene is the single most important practice to prevent the spread of infections. Proper handwashing can reduce respiratory infections by 16-21%.

When to Wash Your Hands:
- Before eating or preparing food
- After using the toilet
- After coughing, sneezing, or blowing your nose
- After touching animals or animal waste
- After handling garbage
- Before and after caring for someone who is sick

How to Wash Properly:
1. Wet hands with clean running water
2. Apply soap and lather well
3. Scrub all surfaces for at least 20 seconds
4. Rinse thoroughly under running water
5. Dry with a clean towel or air dry

Hand Sanitizer:
When soap and water are not available, use a hand sanitizer with at least 60% alcohol. Apply to the palm of one hand and rub hands together.

Why It Matters:
Germs can spread through hand contact with contaminated surfaces. Clean hands protect you and those around you from illness.`,
    author: 'HealthBridge Hygiene Team',
    status: 'PUBLISHED',
    classification: { category: 'Hygiene', keywords: ['hygiene', 'hand washing', 'clean', 'soap', 'germs', 'bacteria', 'infection', 'sanitizer', 'health', 'cleanliness'], qualityScore: 0.8 },
  },
  {
    title: 'First Aid Basics Everyone Should Know',
    category: 'First Aid',
    summary: 'Essential first aid knowledge for handling common emergencies safely.',
    content: `Knowing basic first aid can save lives in emergency situations. Here are essential first aid skills everyone should understand.

For Minor Cuts and Wounds:
1. Wash hands before treating the wound
2. Clean the wound gently with water
3. Apply antibiotic ointment if available
4. Cover with a clean bandage
5. Change the bandage daily

For Burns:
1. Cool the burn under running water for 10-20 minutes
2. Do not apply ice or butter
3. Cover loosely with a sterile bandage
4. Take over-the-counter pain relief if needed

For Choking:
- For adults: Perform abdominal thrusts (Heimlich maneuver)
- For infants: Use back blows and chest thrusts
- Call emergency services immediately if the person cannot breathe

For Allergic Reactions:
1. Help the person use their epinephrine auto-injector if available
2. Call emergency services
3. Keep the person calm and lying down

When to Call Emergency Services:
- Difficulty breathing
- Chest pain
- Severe bleeding
- Loss of consciousness
- Suspected fracture or spinal injury

Important: First aid is temporary care. Always seek professional medical help for serious injuries.`,
    author: 'HealthBridge First Aid Team',
    status: 'PUBLISHED',
    classification: { category: 'First Aid', keywords: ['first aid', 'emergency', 'wound', 'burn', 'choking', 'bleeding', 'CPR', 'allergic', 'treatment', 'safety'], qualityScore: 0.8 },
  },
  {
    title: 'Preventive Healthcare: Staying Ahead of Illness',
    category: 'Preventive Care',
    summary: 'How preventive healthcare helps you stay healthy and catch potential issues early.',
    content: `Preventive healthcare focuses on maintaining health and preventing diseases before they occur. It is more effective and less costly than treating illnesses.

Types of Preventive Care:
1. Primary Prevention: Preventing disease before it occurs
   - Vaccinations
   - Healthy lifestyle choices
   - Regular exercise

2. Secondary Prevention: Early detection
   - Regular health screenings
   - Blood pressure checks
   - Cancer screenings

3. Tertiary Prevention: Managing existing conditions
   - Regular follow-ups
   - Medication management
   - Rehabilitation

Recommended Screenings by Age:
- Adults 18-39: Blood pressure every 2 years, cholesterol every 4-6 years
- Adults 40-64: Diabetes screening, cancer screenings as recommended
- Adults 65+: Bone density tests, hearing and vision checks

Preventive Health Habits:
- Get regular check-ups
- Stay up to date on vaccinations
- Maintain a healthy weight
- Exercise regularly (150 minutes per week)
- Don't smoke
- Limit alcohol consumption
- Manage stress through healthy activities`,
    author: 'HealthBridge Preventive Care Team',
    status: 'PUBLISHED',
    classification: { category: 'Preventive Care', keywords: ['preventive', 'screening', 'checkup', 'early detection', 'vaccination', 'health', 'disease', 'wellness', 'exercise', 'lifestyle'], qualityScore: 0.85 },
  },
  {
    title: 'Building a Healthy Lifestyle',
    category: 'Healthy Lifestyle',
    summary: 'Practical steps to build and maintain a healthy, active lifestyle.',
    content: `A healthy lifestyle is built on consistent daily habits that support your physical and mental well-being.

Physical Activity:
- Aim for at least 150 minutes of moderate exercise per week
- Include both aerobic and strength-training exercises
- Take walking breaks if you have a sedentary job
- Find activities you enjoy to stay motivated

Sleep:
- Adults need 7-9 hours of sleep per night
- Maintain a consistent sleep schedule
- Create a dark, quiet sleeping environment
- Avoid screens 1 hour before bedtime

Stress Management:
- Practice mindfulness or meditation
- Maintain social connections
- Set realistic goals and priorities
- Take time for hobbies and relaxation

Healthy Relationships:
- Communicate openly with family and friends
- Set healthy boundaries
- Seek support when needed
- Practice empathy and kindness

Avoiding Harmful Habits:
- Don't smoke or use tobacco products
- Limit alcohol consumption
- Avoid recreational drugs
- Practice safe sun exposure

Building a healthy lifestyle takes time. Start with small changes and gradually build new habits. Every positive choice contributes to your overall well-being.`,
    author: 'HealthBridge Wellness Team',
    status: 'PUBLISHED',
    classification: { category: 'Healthy Lifestyle', keywords: ['exercise', 'sleep', 'stress', 'wellness', 'fitness', 'mindfulness', 'physical activity', 'mental health', 'habits', 'relaxation'], qualityScore: 0.85 },
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB for seeding');

    await User.deleteMany({});
    await Resource.deleteMany({});
    await Article.deleteMany({});

    const users = [];
    for (const userData of seedUsers) {
      const user = await User.create(userData);
      users.push(user);
    }
    console.log(`Seeded ${users.length} users`);

    const orgUser = users.find(u => u.role === 'ORGANIZATION');
    const resources = [];
    for (const resourceData of seedResources) {
      const resource = await Resource.create({
        ...resourceData,
        createdBy: orgUser._id,
        organization: orgUser.name,
      });
      resources.push(resource);
    }
    console.log(`Seeded ${resources.length} resources`);

    const articles = [];
    for (const articleData of seedArticles) {
      const article = await Article.create({
        ...articleData,
        createdBy: orgUser._id,
      });
      articles.push(article);
    }
    console.log(`Seeded ${articles.length} articles`);

    console.log('\nDemo Accounts:');
    console.log('  admin@healthbridge.local / demo123 (ADMIN)');
    console.log('  organization@healthbridge.local / demo123 (ORGANIZATION)');
    console.log('  citizen@healthbridge.local / demo123 (CITIZEN)');

    await mongoose.disconnect();
    console.log('\nSeeding complete!');
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seed();
