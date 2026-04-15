import React, { useState } from 'react';

interface Event {
  id: number;
  date: number;
  title: string;
  type: string;
  typeColor: string;
  datetime: string;
  month: number;
  monthName: string;
  description: string;
  features: string[];
  attendees: number;
  badgeColor: string;
}

const allEvents: Event[] = [
  // February 2026 (4 events)
  {
    id: 1,
    date: 5,
    title: "Heart Health Screening",
    type: "Health Campaign",
    typeColor: "bg-blue-500",
    datetime: "Thursday, February 5th • 9:00 AM - 3:00 PM",
    month: 0,
    monthName: "Feb",
    description: "Free cardiovascular screening event with expert cardiologists. Get your blood pressure, cholesterol, and heart rate checked.",
    features: [
      "Free ECG and blood pressure monitoring",
      "Cholesterol level testing",
      "Personalized heart health consultation",
      "Diet and exercise recommendations"
    ],
    attendees: 65,
    badgeColor: "from-blue-500 to-blue-700"
  },
  {
    id: 2,
    date: 10,
    title: "Nutrition & Wellness Workshop",
    type: "Community Workshop",
    typeColor: "bg-green-500",
    datetime: "Tuesday, February 10th • 11:00 AM - 2:00 PM",
    month: 0,
    monthName: "Feb",
    description: "Learn about balanced nutrition, meal planning, and healthy eating habits from certified nutritionists.",
    features: [
      "Personalized diet consultation",
      "Meal planning strategies",
      "Weight management tips",
      "Free nutrition guide booklet"
    ],
    attendees: 89,
    badgeColor: "from-green-500 to-green-700"
  },
  {
    id: 3,
    date: 14,
    title: "Valentine's Health Fair",
    type: "Community Event",
    typeColor: "bg-pink-500",
    datetime: "Saturday, February 14th • 10:00 AM - 4:00 PM",
    month: 0,
    monthName: "Feb",
    description: "Celebrate love and health! Free health screenings, wellness activities, and expert talks on maintaining a healthy heart.",
    features: [
      "Couples health screening packages",
      "Nutrition and fitness workshops",
      "Stress management techniques",
      "Free healthy refreshments"
    ],
    attendees: 142,
    badgeColor: "from-pink-500 to-pink-700"
  },
  {
    id: 4,
    date: 22,
    title: "Cancer Awareness Webinar",
    type: "Educational Webinar",
    typeColor: "bg-purple-500",
    datetime: "Sunday, February 22nd • 2:00 PM - 4:00 PM",
    month: 0,
    monthName: "Feb",
    description: "Join leading oncologists for an informative session on cancer prevention, early detection, and treatment options.",
    features: [
      "Expert panel discussion",
      "Q&A with oncology specialists",
      "Free screening vouchers for attendees",
      "Resource guide and support information"
    ],
    attendees: 198,
    badgeColor: "from-purple-500 to-purple-700"
  },
  
  // March 2026 (4 events)
  {
    id: 5,
    date: 8,
    title: "Women's Health Day",
    type: "Health Campaign",
    typeColor: "bg-pink-500",
    datetime: "Sunday, March 8th • 9:00 AM - 5:00 PM",
    month: 1,
    monthName: "Mar",
    description: "International Women's Day special - comprehensive health screening and wellness workshops exclusively for women.",
    features: [
      "Free mammography screening",
      "Gynecological consultations",
      "Nutrition and wellness workshops",
      "Mental health support sessions"
    ],
    attendees: 215,
    badgeColor: "from-pink-500 to-pink-700"
  },
  {
    id: 6,
    date: 15,
    title: "Pediatric Health Check-up Camp",
    type: "Vaccination",
    typeColor: "bg-teal-500",
    datetime: "Sunday, March 15th • 10:00 AM - 3:00 PM",
    month: 1,
    monthName: "Mar",
    description: "Free health check-ups and vaccinations for children. Expert pediatricians available for consultations.",
    features: [
      "Complete physical examination",
      "Growth and development assessment",
      "Vaccination updates",
      "Nutritional guidance for parents"
    ],
    attendees: 178,
    badgeColor: "from-teal-500 to-teal-700"
  },
  {
    id: 7,
    date: 21,
    title: "World Sleep Day Seminar",
    type: "Educational Webinar",
    typeColor: "bg-indigo-500",
    datetime: "Saturday, March 21st • 3:00 PM - 5:00 PM",
    month: 1,
    monthName: "Mar",
    description: "Learn about the importance of quality sleep and how to overcome sleep disorders with expert sleep specialists.",
    features: [
      "Sleep pattern analysis techniques",
      "Expert tips for better sleep hygiene",
      "Stress and insomnia management",
      "Free sleep assessment tools"
    ],
    attendees: 156,
    badgeColor: "from-indigo-500 to-indigo-700"
  },
  {
    id: 8,
    date: 28,
    title: "Kidney Health Awareness",
    type: "Health Campaign",
    typeColor: "bg-orange-600",
    datetime: "Saturday, March 28th • 9:00 AM - 2:00 PM",
    month: 1,
    monthName: "Mar",
    description: "World Kidney Day - Free kidney function tests and education on preventing kidney disease.",
    features: [
      "Free creatinine & urea testing",
      "Blood pressure monitoring",
      "Dietary counseling for kidney health",
      "Dialysis awareness session"
    ],
    attendees: 134,
    badgeColor: "from-orange-600 to-orange-800"
  },

  // April 2026 (4 events)
  {
    id: 9,
    date: 7,
    title: "World Health Day Celebration",
    type: "Community Event",
    typeColor: "bg-green-500",
    datetime: "Tuesday, April 7th • 8:00 AM - 6:00 PM",
    month: 2,
    monthName: "Apr",
    description: "Celebrate World Health Day with free screenings, fitness activities, and health awareness sessions.",
    features: [
      "Multi-specialty health screening",
      "Yoga and meditation sessions",
      "Healthy cooking demonstrations",
      "Free health assessment reports"
    ],
    attendees: 312,
    badgeColor: "from-green-500 to-green-700"
  },
  {
    id: 10,
    date: 12,
    title: "Parkinson's Disease Awareness",
    type: "Educational Webinar",
    typeColor: "bg-blue-600",
    datetime: "Sunday, April 12th • 3:00 PM - 5:00 PM",
    month: 2,
    monthName: "Apr",
    description: "World Parkinson's Day - Understanding symptoms, treatment options, and caregiver support.",
    features: [
      "Early symptom recognition",
      "Treatment and therapy options",
      "Caregiver support resources",
      "Exercise programs for patients"
    ],
    attendees: 97,
    badgeColor: "from-blue-600 to-blue-800"
  },
  {
    id: 11,
    date: 18,
    title: "Diabetes Management Workshop",
    type: "Community Workshop",
    typeColor: "bg-orange-500",
    datetime: "Saturday, April 18th • 11:00 AM - 2:00 PM",
    month: 2,
    monthName: "Apr",
    description: "Interactive workshop on managing diabetes through lifestyle modifications, diet, and medication.",
    features: [
      "Blood sugar monitoring training",
      "Diabetic meal planning guide",
      "Exercise routines for diabetics",
      "Free glucometer for attendees"
    ],
    attendees: 134,
    badgeColor: "from-orange-500 to-orange-700"
  },
  {
    id: 12,
    date: 25,
    title: "Malaria Prevention Campaign",
    type: "Vaccination",
    typeColor: "bg-yellow-500",
    datetime: "Saturday, April 25th • 9:00 AM - 4:00 PM",
    month: 2,
    monthName: "Apr",
    description: "World Malaria Day special - free testing, prevention education, and antimalarial distribution.",
    features: [
      "Free malaria testing",
      "Mosquito net distribution",
      "Prevention and awareness education",
      "Antimalarial medication guidance"
    ],
    attendees: 245,
    badgeColor: "from-yellow-500 to-yellow-700"
  },

  // May 2026 (4 events)
  {
    id: 13,
    date: 5,
    title: "Hand Hygiene Campaign",
    type: "Health Campaign",
    typeColor: "bg-blue-400",
    datetime: "Tuesday, May 5th • 10:00 AM - 2:00 PM",
    month: 3,
    monthName: "May",
    description: "World Hand Hygiene Day - Learn proper handwashing techniques and infection prevention methods.",
    features: [
      "Interactive hygiene demonstrations",
      "Free sanitizer and soap kits",
      "Infection prevention workshops",
      "Certification for healthcare workers"
    ],
    attendees: 187,
    badgeColor: "from-blue-400 to-blue-600"
  },
  {
    id: 14,
    date: 17,
    title: "Hypertension Awareness Day",
    type: "Health Campaign",
    typeColor: "bg-red-500",
    datetime: "Sunday, May 17th • 9:00 AM - 5:00 PM",
    month: 3,
    monthName: "May",
    description: "Free blood pressure screening and education on preventing and managing high blood pressure.",
    features: [
      "Free blood pressure monitoring",
      "Lifestyle modification counseling",
      "Medication management guidance",
      "Stress reduction techniques"
    ],
    attendees: 221,
    badgeColor: "from-red-500 to-red-700"
  },
  {
    id: 15,
    date: 24,
    title: "Epilepsy Awareness Seminar",
    type: "Educational Webinar",
    typeColor: "bg-purple-600",
    datetime: "Sunday, May 24th • 2:00 PM - 4:00 PM",
    month: 3,
    monthName: "May",
    description: "Understanding epilepsy - seizure management, first aid, and living with epilepsy.",
    features: [
      "Seizure first aid training",
      "Treatment options overview",
      "Lifestyle management tips",
      "Support group information"
    ],
    attendees: 103,
    badgeColor: "from-purple-600 to-purple-800"
  },
  {
    id: 16,
    date: 31,
    title: "World No Tobacco Day",
    type: "Educational Webinar",
    typeColor: "bg-gray-500",
    datetime: "Sunday, May 31st • 4:00 PM - 6:00 PM",
    month: 3,
    monthName: "May",
    description: "Join our smoking cessation program and learn about the health risks of tobacco use.",
    features: [
      "Free smoking cessation counseling",
      "Nicotine replacement therapy info",
      "Support group connections",
      "Lung health assessment vouchers"
    ],
    attendees: 98,
    badgeColor: "from-gray-500 to-gray-700"
  },

  // June 2026 (4 events)
  {
    id: 17,
    date: 7,
    title: "Food Safety Workshop",
    type: "Community Workshop",
    typeColor: "bg-amber-500",
    datetime: "Sunday, June 7th • 10:00 AM - 1:00 PM",
    month: 4,
    monthName: "Jun",
    description: "World Food Safety Day - Learn about safe food handling, storage, and preventing foodborne illnesses.",
    features: [
      "Food safety best practices",
      "Preventing food contamination",
      "Safe cooking temperatures guide",
      "Food storage tips"
    ],
    attendees: 142,
    badgeColor: "from-amber-500 to-amber-700"
  },
  {
    id: 18,
    date: 14,
    title: "Blood Donation Drive",
    type: "Community Event",
    typeColor: "bg-red-600",
    datetime: "Sunday, June 14th • 8:00 AM - 6:00 PM",
    month: 4,
    monthName: "Jun",
    description: "World Blood Donor Day - Save lives by donating blood. Every donation counts!",
    features: [
      "Safe and hygienic blood collection",
      "Free health screening for donors",
      "Refreshments and certificates",
      "Blood group typing included"
    ],
    attendees: 342,
    badgeColor: "from-red-600 to-red-800"
  },
  {
    id: 19,
    date: 21,
    title: "International Yoga Day",
    type: "Community Workshop",
    typeColor: "bg-purple-400",
    datetime: "Sunday, June 21st • 6:00 AM - 9:00 AM",
    month: 4,
    monthName: "Jun",
    description: "Celebrate International Yoga Day with mass yoga sessions, meditation, and wellness talks.",
    features: [
      "Expert-led yoga sessions",
      "Meditation and breathing exercises",
      "Ayurvedic health consultations",
      "Free yoga mats for participants"
    ],
    attendees: 456,
    badgeColor: "from-purple-400 to-purple-600"
  },
  {
    id: 20,
    date: 26,
    title: "Anti-Drug Awareness Program",
    type: "Educational Webinar",
    typeColor: "bg-orange-600",
    datetime: "Friday, June 26th • 3:00 PM - 5:00 PM",
    month: 4,
    monthName: "Jun",
    description: "International Day Against Drug Abuse - Education on drug prevention and rehabilitation support.",
    features: [
      "Expert talks on drug prevention",
      "Counseling for affected families",
      "Rehabilitation program information",
      "Youth awareness activities"
    ],
    attendees: 167,
    badgeColor: "from-orange-600 to-orange-800"
  },

  // July 2026 (4 events)
  {
    id: 21,
    date: 11,
    title: "World Population Day Health Camp",
    type: "Health Campaign",
    typeColor: "bg-teal-600",
    datetime: "Saturday, July 11th • 10:00 AM - 4:00 PM",
    month: 5,
    monthName: "Jul",
    description: "Family planning awareness and reproductive health services for the community.",
    features: [
      "Family planning counseling",
      "Reproductive health screenings",
      "Contraception education",
      "Maternal health guidance"
    ],
    attendees: 203,
    badgeColor: "from-teal-600 to-teal-800"
  },
  {
    id: 22,
    date: 15,
    title: "Vision Care Camp",
    type: "Health Campaign",
    typeColor: "bg-cyan-500",
    datetime: "Wednesday, July 15th • 9:00 AM - 3:00 PM",
    month: 5,
    monthName: "Jul",
    description: "Free eye check-ups, vision testing, and distribution of reading glasses to those in need.",
    features: [
      "Comprehensive eye examination",
      "Vision acuity testing",
      "Free reading glasses for seniors",
      "Cataract screening"
    ],
    attendees: 267,
    badgeColor: "from-cyan-500 to-cyan-700"
  },
  {
    id: 23,
    date: 20,
    title: "Summer Health & Safety Workshop",
    type: "Community Workshop",
    typeColor: "bg-yellow-600",
    datetime: "Monday, July 20th • 11:00 AM - 2:00 PM",
    month: 5,
    monthName: "Jul",
    description: "Learn how to stay healthy during summer - hydration, sun protection, and heat stroke prevention.",
    features: [
      "Heat-related illness prevention",
      "Sun safety education",
      "Hydration tips and demonstrations",
      "Free sunscreen samples"
    ],
    attendees: 145,
    badgeColor: "from-yellow-600 to-yellow-800"
  },
  {
    id: 24,
    date: 28,
    title: "Hepatitis Awareness Campaign",
    type: "Vaccination",
    typeColor: "bg-orange-500",
    datetime: "Tuesday, July 28th • 9:00 AM - 5:00 PM",
    month: 5,
    monthName: "Jul",
    description: "World Hepatitis Day - Free testing, vaccination, and education on hepatitis prevention.",
    features: [
      "Free hepatitis screening",
      "Vaccination for eligible individuals",
      "Liver health assessment",
      "Prevention education materials"
    ],
    attendees: 189,
    badgeColor: "from-orange-500 to-orange-700"
  },

  // August 2026 (4 events)
  {
    id: 25,
    date: 1,
    title: "World Breastfeeding Week",
    type: "Educational Webinar",
    typeColor: "bg-pink-400",
    datetime: "Saturday, August 1st • 10:00 AM - 1:00 PM",
    month: 6,
    monthName: "Aug",
    description: "Support for new mothers - breastfeeding education, lactation counseling, and maternal health.",
    features: [
      "Lactation consultant sessions",
      "Breastfeeding technique training",
      "Maternal nutrition guidance",
      "Support group formation"
    ],
    attendees: 112,
    badgeColor: "from-pink-400 to-pink-600"
  },
  {
    id: 26,
    date: 12,
    title: "Youth Mental Health Day",
    type: "Community Workshop",
    typeColor: "bg-indigo-600",
    datetime: "Wednesday, August 12th • 2:00 PM - 5:00 PM",
    month: 6,
    monthName: "Aug",
    description: "Mental health awareness for youth - stress management, anxiety, and depression support.",
    features: [
      "Free mental health screening",
      "Counseling sessions for teenagers",
      "Stress management workshops",
      "Peer support group formation"
    ],
    attendees: 234,
    badgeColor: "from-indigo-600 to-indigo-800"
  },
  {
    id: 27,
    date: 19,
    title: "Senior Citizen Health Check-up",
    type: "Health Campaign",
    typeColor: "bg-blue-600",
    datetime: "Wednesday, August 19th • 9:00 AM - 3:00 PM",
    month: 6,
    monthName: "Aug",
    description: "Comprehensive health screening specially designed for senior citizens.",
    features: [
      "Complete geriatric assessment",
      "Bone density screening",
      "Vision and hearing tests",
      "Medication review and counseling"
    ],
    attendees: 176,
    badgeColor: "from-blue-600 to-blue-800"
  },
  {
    id: 28,
    date: 26,
    title: "Organ Donation Awareness",
    type: "Community Event",
    typeColor: "bg-green-600",
    datetime: "Wednesday, August 26th • 11:00 AM - 3:00 PM",
    month: 6,
    monthName: "Aug",
    description: "Learn about organ donation - registration process, myths vs facts, and saving lives through donation.",
    features: [
      "Organ donation registration drive",
      "Myth-busting educational sessions",
      "Donor family testimonials",
      "Pledge cards and certificates"
    ],
    attendees: 198,
    badgeColor: "from-green-600 to-green-800"
  },

  // September 2026 (4 events)
  {
    id: 29,
    date: 10,
    title: "World Suicide Prevention Day",
    type: "Educational Webinar",
    typeColor: "bg-purple-600",
    datetime: "Thursday, September 10th • 4:00 PM - 6:00 PM",
    month: 7,
    monthName: "Sep",
    description: "Mental health support and suicide prevention awareness with expert psychologists.",
    features: [
      "Crisis intervention training",
      "Mental health resource sharing",
      "Support hotline information",
      "Community support network building"
    ],
    attendees: 156,
    badgeColor: "from-purple-600 to-purple-800"
  },
  {
    id: 30,
    date: 15,
    title: "Lymphoma Awareness Seminar",
    type: "Educational Webinar",
    typeColor: "bg-lime-600",
    datetime: "Tuesday, September 15th • 3:00 PM - 5:00 PM",
    month: 7,
    monthName: "Sep",
    description: "World Lymphoma Awareness Day - Understanding symptoms, diagnosis, and treatment of lymphoma.",
    features: [
      "Early symptom recognition",
      "Diagnostic procedures overview",
      "Treatment options discussion",
      "Survivor stories and support"
    ],
    attendees: 89,
    badgeColor: "from-lime-600 to-lime-800"
  },
  {
    id: 31,
    date: 21,
    title: "World Alzheimer's Day Seminar",
    type: "Educational Webinar",
    typeColor: "bg-indigo-500",
    datetime: "Monday, September 21st • 3:00 PM - 5:00 PM",
    month: 7,
    monthName: "Sep",
    description: "Understanding Alzheimer's disease - early detection, caregiving tips, and support resources.",
    features: [
      "Memory screening tests",
      "Caregiver support sessions",
      "Early warning signs education",
      "Resource guide for families"
    ],
    attendees: 198,
    badgeColor: "from-indigo-500 to-indigo-700"
  },
  {
    id: 32,
    date: 28,
    title: "World Heart Day Health Fair",
    type: "Health Campaign",
    typeColor: "bg-red-500",
    datetime: "Monday, September 28th • 8:00 AM - 6:00 PM",
    month: 7,
    monthName: "Sep",
    description: "Comprehensive cardiac screening and heart health education for all ages.",
    features: [
      "Free ECG and cardiac check-up",
      "Lipid profile testing",
      "Heart-healthy diet planning",
      "Exercise prescription for heart health"
    ],
    attendees: 287,
    badgeColor: "from-red-500 to-red-700"
  },

  // October 2026 (4 events)
  {
    id: 33,
    date: 1,
    title: "International Day of Older Persons",
    type: "Community Event",
    typeColor: "bg-amber-600",
    datetime: "Thursday, October 1st • 10:00 AM - 4:00 PM",
    month: 8,
    monthName: "Oct",
    description: "Celebrating senior citizens with health screenings, entertainment, and wellness activities.",
    features: [
      "Comprehensive health screening",
      "Social activities and entertainment",
      "Nutritional counseling",
      "Free medication review"
    ],
    attendees: 245,
    badgeColor: "from-amber-600 to-amber-800"
  },
  {
    id: 34,
    date: 10,
    title: "World Mental Health Day",
    type: "Community Workshop",
    typeColor: "bg-green-600",
    datetime: "Saturday, October 10th • 11:00 AM - 3:00 PM",
    month: 8,
    monthName: "Oct",
    description: "Mental health awareness and support services - breaking the stigma around mental illness.",
    features: [
      "Free psychological assessments",
      "Therapy session information",
      "Workplace mental health tips",
      "Support group connections"
    ],
    attendees: 312,
    badgeColor: "from-green-600 to-green-800"
  },
  {
    id: 35,
    date: 20,
    title: "Breast Cancer Awareness Walk",
    type: "Community Event",
    typeColor: "bg-pink-600",
    datetime: "Tuesday, October 20th • 6:00 AM - 9:00 AM",
    month: 8,
    monthName: "Oct",
    description: "Pink October - Breast cancer awareness walk, free screening camps, and survivor stories.",
    features: [
      "Free mammography screening vouchers",
      "Self-examination training",
      "Survivor support network",
      "Pink ribbon merchandise"
    ],
    attendees: 523,
    badgeColor: "from-pink-600 to-pink-800"
  },
  {
    id: 36,
    date: 29,
    title: "World Stroke Day Awareness",
    type: "Health Campaign",
    typeColor: "bg-red-600",
    datetime: "Thursday, October 29th • 9:00 AM - 4:00 PM",
    month: 8,
    monthName: "Oct",
    description: "Learn FAST signs of stroke, prevention strategies, and immediate response actions.",
    features: [
      "Stroke risk assessment",
      "FAST recognition training",
      "Blood pressure monitoring",
      "Lifestyle modification counseling"
    ],
    attendees: 187,
    badgeColor: "from-red-600 to-red-800"
  },

  // November 2026 (4 events)
  {
    id: 37,
    date: 8,
    title: "Radiography & Imaging Awareness",
    type: "Educational Webinar",
    typeColor: "bg-sky-600",
    datetime: "Sunday, November 8th • 2:00 PM - 4:00 PM",
    month: 9,
    monthName: "Nov",
    description: "International Day of Radiology - Understanding medical imaging, safety, and technological advances.",
    features: [
      "Medical imaging explained",
      "Radiation safety education",
      "When to get imaging tests",
      "Latest technology showcase"
    ],
    attendees: 124,
    badgeColor: "from-sky-600 to-sky-800"
  },
  {
    id: 38,
    date: 14,
    title: "World Diabetes Day Campaign",
    type: "Health Campaign",
    typeColor: "bg-blue-500",
    datetime: "Saturday, November 14th • 9:00 AM - 5:00 PM",
    month: 9,
    monthName: "Nov",
    description: "Free diabetes screening, education on prevention, and management strategies.",
    features: [
      "Free HbA1c and blood sugar testing",
      "Diabetic retinopathy screening",
      "Dietary counseling sessions",
      "Insulin administration training"
    ],
    attendees: 378,
    badgeColor: "from-blue-500 to-blue-700"
  },
  {
    id: 39,
    date: 19,
    title: "Men's Health Awareness Day",
    type: "Health Campaign",
    typeColor: "bg-cyan-600",
    datetime: "Thursday, November 19th • 9:00 AM - 4:00 PM",
    month: 9,
    monthName: "Nov",
    description: "International Men's Day special - comprehensive health screening for men of all ages.",
    features: [
      "Prostate cancer screening",
      "Cardiovascular health assessment",
      "Testosterone level testing",
      "Men's mental health support"
    ],
    attendees: 234,
    badgeColor: "from-cyan-600 to-cyan-800"
  },
  {
    id: 40,
    date: 25,
    title: "Violence Prevention Workshop",
    type: "Educational Webinar",
    typeColor: "bg-orange-600",
    datetime: "Wednesday, November 25th • 3:00 PM - 6:00 PM",
    month: 9,
    monthName: "Nov",
    description: "International Day for Elimination of Violence - awareness, support, and prevention strategies.",
    features: [
      "Domestic violence awareness",
      "Safety planning workshops",
      "Legal support information",
      "Counseling services access"
    ],
    attendees: 167,
    badgeColor: "from-orange-600 to-orange-800"
  },

  // December 2026 (4 events)
  {
    id: 41,
    date: 1,
    title: "World AIDS Day Awareness",
    type: "Health Campaign",
    typeColor: "bg-red-600",
    datetime: "Tuesday, December 1st • 10:00 AM - 5:00 PM",
    month: 10,
    monthName: "Dec",
    description: "Free HIV testing, prevention education, and support for people living with HIV/AIDS.",
    features: [
      "Free and confidential HIV testing",
      "Prevention education sessions",
      "Treatment and support information",
      "Stigma reduction awareness"
    ],
    attendees: 298,
    badgeColor: "from-red-600 to-red-800"
  },
  {
    id: 42,
    date: 10,
    title: "Human Rights & Health Symposium",
    type: "Educational Webinar",
    typeColor: "bg-indigo-600",
    datetime: "Thursday, December 10th • 2:00 PM - 5:00 PM",
    month: 10,
    monthName: "Dec",
    description: "Human Rights Day special - healthcare as a fundamental right, accessibility, and equity.",
    features: [
      "Healthcare rights education",
      "Patient advocacy training",
      "Legal aid information",
      "Community health initiatives"
    ],
    attendees: 189,
    badgeColor: "from-indigo-600 to-indigo-800"
  },
  {
    id: 43,
    date: 15,
    title: "Dental Health Camp",
    type: "Health Campaign",
    typeColor: "bg-teal-500",
    datetime: "Tuesday, December 15th • 10:00 AM - 4:00 PM",
    month: 10,
    monthName: "Dec",
    description: "Free dental check-ups, cleaning, and oral health education for all ages.",
    features: [
      "Complete dental examination",
      "Free teeth cleaning",
      "Cavity detection and treatment",
      "Oral hygiene education"
    ],
    attendees: 256,
    badgeColor: "from-teal-500 to-teal-700"
  },
  {
    id: 44,
    date: 20,
    title: "Winter Wellness Fair",
    type: "Community Event",
    typeColor: "bg-blue-400",
    datetime: "Sunday, December 20th • 11:00 AM - 4:00 PM",
    month: 10,
    monthName: "Dec",
    description: "Stay healthy this winter - flu prevention, cold care, and seasonal wellness tips.",
    features: [
      "Free flu vaccination",
      "Vitamin D level screening",
      "Winter skin care tips",
      "Immunity boosting guidance"
    ],
    attendees: 421,
    badgeColor: "from-blue-400 to-blue-600"
  }
];

const monthNames = ['February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const daysInMonth = [28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // Feb-Dec 2026
const monthStartDays = [0, 0, 1, 4, 6, 2, 4, 0, 3, 5, 1]; // First day of week for each month (0=Sunday)

export function CalendarSection() {
  const [currentMonth, setCurrentMonth] = useState(0); // 0 = February, 10 = December
  const [selectedDate, setSelectedDate] = useState<number | null>(5);
  
  const monthEvents = allEvents.filter(e => e.month === currentMonth);
  const currentEvent = selectedDate ? monthEvents.find(e => e.date === selectedDate) : null;
  
  const handlePrevMonth = () => {
    if (currentMonth > 0) {
      setCurrentMonth(currentMonth - 1);
      setSelectedDate(null);
    }
  };
  
  const handleNextMonth = () => {
    if (currentMonth < 10) {
      setCurrentMonth(currentMonth + 1);
      setSelectedDate(null);
    }
  };
  
  const getDateClass = (date: number) => {
    const baseClass = "date-btn p-2 rounded-lg transition-all relative";
    const isSelected = date === selectedDate;
    
    if (isSelected) {
      return `${baseClass} bg-primary text-white shadow-glow font-bold transform scale-110`;
    }
    
    return `${baseClass} hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 cursor-pointer hover:scale-105`;
  };
  
  const hasEvent = (date: number) => monthEvents.find(e => e.date === date);
  
  const renderCalendarDates = () => {
    const days = [];
    const totalDays = daysInMonth[currentMonth];
    const startDay = monthStartDays[currentMonth];
    
    // Previous month's trailing dates
    for (let i = 0; i < startDay; i++) {
      const prevMonthDays = currentMonth === 0 ? 31 : daysInMonth[currentMonth - 1];
      days.push(
        <div key={`prev-${i}`} className="p-2 text-slate-300 dark:text-slate-600 cursor-default">
          {prevMonthDays - startDay + i + 1}
        </div>
      );
    }
    
    // Current month dates
    for (let date = 1; date <= totalDays; date++) {
      const event = hasEvent(date);
      days.push(
        <button
          key={date}
          onClick={() => setSelectedDate(date)}
          className={getDateClass(date)}
        >
          {date}
          {event && (
            <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 ${event.typeColor} rounded-full ring-2 ring-white dark:ring-slate-800`}></span>
          )}
        </button>
      );
    }
    
    return days;
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      {/* Calendar Widget */}
      <div className="lg:col-span-5">
        <div className="glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-700 flex flex-col" style={{ height: '600px' }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="block text-2xl font-bold text-slate-900 dark:text-white">{monthNames[currentMonth]} 2026</span>
              <span className="text-sm text-slate-500">Click a date to view events</span>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={handlePrevMonth}
                disabled={currentMonth === 0}
                className={`p-2 rounded-xl transition-colors ${
                  currentMonth === 0 
                    ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed' 
                    : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <button 
                onClick={handleNextMonth}
                disabled={currentMonth === 10}
                className={`p-2 rounded-xl transition-colors ${
                  currentMonth === 10 
                    ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed' 
                    : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
          
          {/* Calendar Header */}
          <div className="grid grid-cols-7 text-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
            <div className="py-2">Su</div>
            <div className="py-2">Mo</div>
            <div className="py-2">Tu</div>
            <div className="py-2">We</div>
            <div className="py-2">Th</div>
            <div className="py-2">Fr</div>
            <div className="py-2">Sa</div>
          </div>
          
          {/* Calendar Dates */}
          <div className="grid grid-cols-7 gap-2 text-center text-sm mb-6 flex-grow">
            {renderCalendarDates()}
          </div>
          
          {/* Legend */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">Event Types</h4>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 ring-2 ring-blue-200"></span>
                <span className="text-xs text-slate-600 dark:text-slate-400">Campaigns</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-500 ring-2 ring-teal-200"></span>
                <span className="text-xs text-slate-600 dark:text-slate-400">Vaccinations</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500 ring-2 ring-purple-200"></span>
                <span className="text-xs text-slate-600 dark:text-slate-400">Webinars</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500 ring-2 ring-orange-200"></span>
                <span className="text-xs text-slate-600 dark:text-slate-400">Workshops</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Event Details Panel */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        <div className="glass-card rounded-3xl p-8 border border-slate-200 dark:border-slate-700 relative animate-fadeIn" style={{ height: '600px' }}>
          {currentEvent ? (
            <>
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <span className="material-symbols-outlined text-[180px] text-slate-400 dark:text-slate-600">event_note</span>
              </div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-6 flex-shrink-0">
                  <div className="flex-1 min-w-0 pr-4">
                    <span className="inline-block px-3 py-1 bg-primary/10 dark:bg-white/10 text-primary dark:text-white rounded-full text-xs font-bold uppercase tracking-wide mb-2">
                      {currentEvent.type}
                    </span>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-1 truncate">{currentEvent.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">{currentEvent.datetime}</p>
                  </div>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentEvent.badgeColor} flex flex-col items-center justify-center text-white shrink-0 shadow-lg`}>
                    <span className="text-xs font-bold uppercase opacity-80">{currentEvent.monthName}</span>
                    <span className="text-2xl font-black">{String(currentEvent.date).padStart(2, '0')}</span>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto mb-6 pr-2">
                  <div className="prose prose-slate dark:prose-invert">
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base mb-4">
                      {currentEvent.description}
                    </p>
                    <ul className="space-y-2.5 mt-3">
                      {currentEvent.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3 text-slate-600 dark:text-slate-400 text-sm">
                          <span className="material-symbols-outlined text-green-500 mt-0.5 text-[18px]">check_circle</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="pt-6 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row gap-4 items-center justify-between flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-3">
                      <div className="w-10 h-10 rounded-full border-2 border-white dark:border-surface-dark bg-slate-200 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBuxWjzz_1ehMaKMznOZ5y0fGR3xRqXg8ePfHH5xwZKwmdTmxG0IocSC2xTtjty9nEt_wq-Gj40dN6ZNYBnlGLHJq4ZgKtG9xcx5PaHIBP3PsRN4kTKWLSvvQ5cbyoDFjvyVjGmvP2eUXh4eVXUycQelzPV7EE_K_SmEO-m55BEyiqujBmr6aU_gfKFxYQ8nzgoMt2kQAnhzxLH4W-BhVsDwjU2khF2EeyNHNPA7hZ-JepIgAIJzeTrZanElgzMoPrHFH63nKoclCow')" }}></div>
                      <div className="w-10 h-10 rounded-full border-2 border-white dark:border-surface-dark bg-slate-300 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAxKAFNYjF1kzGd4IjIfBlLcclkFfphOVYqvFSs9n_B8jTll8pWh4qReEG0xmPPJiroazQQLWb0-deA2Uy4snnoWNj01EMI0oFzl8xlPBpM8oJ-h8kGSvw8M2DMYL_aOD84VV8S-pFKm2W5kpJYFmTR4vKP7H8qf60bohigKv3FOaMr_4Jr9Wdwnb90ruSzb8aS9S8OR6BVl6vgw8vcMH4e9SvEAPivIzcjXzhm6pbm7bTe5JNZSrjp8OWG9vrHv_rA8elOAgGgI5iW')" }}></div>
                      <div className={`w-10 h-10 rounded-full border-2 border-white dark:border-surface-dark bg-slate-400 flex items-center justify-center text-xs font-bold text-white ${currentEvent.typeColor}`}>
                        +{currentEvent.attendees}
                      </div>
                    </div>
                    <span className="text-sm text-slate-500 font-medium">Attending</span>
                  </div>
                  <div className="flex gap-3 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none px-6 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-500 text-slate-700 dark:text-white font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors">
                      Save Date
                    </button>
                    <button className={`flex-1 sm:flex-none px-6 py-3 bg-gradient-to-r ${currentEvent.badgeColor} text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all`}>
                      Register Now
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            // Empty State
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-32 h-32 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[80px] text-slate-300 dark:text-slate-600">event_busy</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">No Event Scheduled</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-md mb-6">
                There are no events scheduled for {selectedDate ? `${monthNames[currentMonth]} ${selectedDate}` : 'this date'}. Check other dates or stay tuned for upcoming events.
              </p>
              <button className="px-6 py-3 bg-gradient-to-r from-primary to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                View All Events
              </button>
            </div>
          )}
        </div>
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
