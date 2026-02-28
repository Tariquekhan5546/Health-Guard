// hospitals.js
var hospitals = [
     { 
  name: "M.G.M. Hospital", 
  lat: 19.01784838147353,
  lon: 73.10454390703627,
  city: "Navi Mumbai",
  state: "Maharashtra",
  contact: "022-27437900",
  description: "A well-equipped general hospital offering professional healthcare services, including outpatient and emergency care.",
  gmap: "https://maps.app.goo.gl/PMjkT5ihxriNMKjv5" 
},
     { 
  name: "Saifee Hospital", 
  lat: 18.952815903707172,
  lon:  72.81823503628851,
  city: "Mumbai",
  state: "Maharashtra",
  contact: "022-67570111",
  description: "A private hospital providing high-quality healthcare with experienced medical staff and advanced facilities for patient care.",
  gmap: "https://maps.app.goo.gl/3jSz1nqAmu62nqnG8" 
},
     { 
  name: "JJ Hospital Mumbai", 
  lat: 18.963050957585835,
  lon:   72.8337285480597,
  city: "Mumbai",
  state: "Maharashtra",
  contact: "Not Available",
  description: "A well-established government hospital offering comprehensive healthcare services with professional medical staff and essential facilities.",
  gmap: "https://maps.app.goo.gl/xg2Fz5gYCLSWynyy5" 
},
     { 
  name: "MedFord Hospital", 
  lat: 19.161351038738587,
  lon:    73.02789004042103,
  city: "Thane",
  state: "Maharashtra",
  contact: "09769000091",
  description: "A well-established Private hospital offering comprehensive healthcare services with professional medical staff and advanced essential facilities for patients.",
  gmap: "https://maps.app.goo.gl/mQEN3Gz58kh2ZZz29" 
},
     { 
  name: "Universal Hospital", 
  lat: 19.16805793646202, 
  lon:    73.02770555480319,
  city: "Thane",
  state: "Maharashtra",
  contact: "08433615255",
  description: "A hospital providing general healthcare services with trained medical staff and essential facilities.",
  gmap: "https://maps.app.goo.gl/qNxQXd89REbr71NGA" 
},
    { name: "Thane Civil Hospital", lat: 19.19919, lon: 72.9774, city: "Thane", state: "Maharashtra",
      contact: "022-12345678", description: "24x7 emergency, government hospital with ICU.", gmap: "https://maps.app.goo.gl/vRUjsA3kSzcg3tsx5" },
    { name: "Tata Memorial Hospital", lat: 19.0644394, lon: 73.0652421, city: "Mumbai", state: "Maharashtra",
      contact: "022-87654321", description: "Cancer specialty hospital with latest treatment.", gmap: "https://maps.app.goo.gl/U9tyid1EjhKkG2tk9" },
    { name: "AIIMS Delhi", lat: 28.5655141, lon: 77.2102608, city: "New Delhi", state: "Delhi",
      contact: "011-26588500", description: "Premier government hospital with multiple specialties.", gmap: "https://maps.app.goo.gl/sFfTEL6QRiMd2uLX9" },
    { name: "Apollo Hospitals", lat: 13.0116, lon: 80.2180, city: "Chennai", state: "Tamil Nadu",
      contact: "044-28291234", description: "Private multispecialty hospital with emergency care.", gmap: "https://www.google.com/maps?q=13.0116,80.2180" },
    { name: "CMC Vellore", lat: 12.9165, lon: 79.1325, city: "Vellore", state: "Tamil Nadu",
      contact: "0416-2282000", description: "Famous for medical research and patient care.", gmap: "https://www.google.com/maps?q=12.9165,79.1325" },
    { name: "Kokilaben Dhirubhai Ambani Hospital",lat: 19.13, lon: 72.82, city: "Mumbai", state: "Maharashtra",
     contact: "022-30696969", description: "Renowned quaternary care hospital known for its Full-Time Specialist System (FTSS) and complex surgeries.",gmap: "https://maps.google.com/?q=19.13,72.82"},
    { name: "Fortis Hospital",lat: 19.16,lon: 72.94,city: "Mumbai",state: "Maharashtra",
     contact: "022-67994141",description: "Recognized for its excellence in tertiary care and a large multi-organ transplant center.",gmap: "https://maps.google.com/?q=19.16,72.94"},
    { name: "Nanavati Max Super Speciality Hospital",lat: 19.1,lon: 72.84,city: "Mumbai",state: "Maharashtra",
      contact: "022-26267777",description: "Trusted hospital offering a wide range of services including advanced cancer care, orthopedics, and transplants.",gmap: "https://maps.google.com/?q=19.10,72.84"},
    {name: "Sir H. N. Reliance Foundation Hospital and Research Centre",lat: 18.96,lon: 72.82,city: "Mumbai",state: "Maharashtra",
    contact: "022-61305000",description: "Multispecialty hospital with a patient-centric approach and a wide range of services.",gmap: "https://maps.google.com/?q=18.96,72.82"},
    { name: "Global Hospital",lat: 19.0,lon: 72.84,city: "Mumbai",state: "Maharashtra",
    contact: "022-67676700",description: "Well-known as a multi-organ transplant hospital, also respected for neurosciences and gastroenterology.",gmap: "https://maps.google.com/?q=19.00,72.84"},
    {name: "Lilavati Hospital and Research Centre",lat: 19.05,lon: 72.83,city: "Mumbai",state: "Maharashtra",
    contact: "022-26751000",description: "Famous for its comprehensive medical services and top-tier emergency care.",gmap: "https://maps.google.com/?q=19.05,72.83"},
    {name: "Wockhardt Hospitals",lat: 18.98,lon: 72.82,city: "Mumbai",state: "Maharashtra",
    contact: "022-66214000",description: "A well-established chain of hospitals known for specialties like cardiology and neurology.",gmap: "https://maps.google.com/?q=18.98,72.82"},
    {name: "Ruby Hall Clinic",lat: 18.52,lon: 73.87,city: "Pune",state: "Maharashtra",
    contact: "020-66455555",description: "One of the top hospitals in Pune, known for its expertise in cardiac sciences, oncology, and transplant medicine.",gmap: "https://maps.google.com/?q=18.52,73.87"},
    { name: "Jaslok Hospital & Research Centre",lat: 18.97,lon: 72.81,city: "Mumbai",state: "Maharashtra",
    contact: "022-66573333",description: "One of India's oldest private super-specialty hospitals, a leading referral center for complex medical issues.",gmap: "https://maps.google.com/?q=18.97,72.81"},
    { name: "Deenanath Mangeshkar Hospital and Research Center",lat: 18.5,lon: 73.83,city: "Pune",state: "Maharashtra",
    contact: "020-40151000",description: "A large, charitable multispecialty hospital that provides a broad spectrum of services.",gmap: "https://maps.google.com/?q=18.50,73.83"},
    {name: "Aditya Birla Memorial Hospital",lat: 18.63,lon: 73.77,city: "Pune",state: "Maharashtra",
    contact: "020-30717500",description: "A state-of-the-art facility known for combining medical excellence with a patient-first approach.",gmap: "https://maps.google.com/?q=18.63,73.77"},
    {name: "Sahyadri Hospitals",lat: 18.5,lon: 73.8,city: "Pune",state: "Maharashtra",
    contact: "020-67215000",description: "A chain of multispecialty hospitals, a prominent name in healthcare across Pune.",gmap: "https://maps.google.com/?q=18.50,73.80"},
    {name: "Wockhardt Super Specialty Hospital",lat: 21.13,lon: 79.06,city: "Nagpur",state: "Maharashtra",
    contact: "0712-6624100",description: "A leading hospital in Central India, known for comprehensive services in specialties like cardiology and orthopedics.",gmap: "https://maps.google.com/?q=21.13,79.06"},
    { name: "Alexis Multispeciality Hospital", lat: 21.19,lon: 79.08,city: "Nagpur",state: "Maharashtra",
    contact: "0712-7108108",description: "Known for its advanced technology and a wide range of services, including cardiology, oncology, and orthopedics.",gmap: "https://maps.google.com/?q=21.19,79.08"},
    { name: "Orange City Hospital & Research Institute", lat: 21.11,lon: 79.07,city: "Nagpur",state: "Maharashtra",
    contact: "0712-6625888",description: "A well-known multispecialty hospital with a wide range of departments and experienced doctors.",gmap: "https://maps.google.com/?q=21.11,79.07"},
    { name: "KIMS-Kingsway Hospitals",lat: 21.15,lon: 79.08,city: "Nagpur",state: "Maharashtra",
    contact: "0712-6755000",description: "Has a large bed capacity with advanced critical care facilities and an extensive range of multispecialty services.",gmap: "https://maps.google.com/?q=21.15,79.08"},
    { name: "Aster Aadhar Hospital",lat: 16.69,lon: 74.24,city: "Kolhapur",state: "Maharashtra",
    contact: "0231-6622555",description: "A highly specialized hospital known for advanced treatments in gastroenterology, neurosciences, and cardiac sciences.",gmap: "https://maps.google.com/?q=19.16,72.945"},
    {name: "Lokmanya Hospital",lat: 16.68,lon: 74.24,city: "Kolhapur",state: "Maharashtra",
    contact: "0231-6789100",description: "A major hospital in Kolhapur, well-known for its expertise in orthopedics, trauma care, and emergency services.",gmap: "https://maps.google.com/?q=19.16,72.946"},
    { name: "Yashodhara Superspeciality Hospital",lat: 17.65,lon: 75.91,city: "Solapur",state: "Maharashtra",
    contact: "0217-2323231",description: "A leading hospital in Solapur offering a broad spectrum of medical services including cardiac, trauma, and laparoscopic surgeries.",gmap: "https://maps.google.com/?q=19.16,72.947"},
    {name: "Solapur Pride Hospital",lat: 17.65,lon: 75.91,city: "Solapur",state: "Maharashtra",
    contact: "08149928100",description: "A prominent 24/7 ICU & multispecialty hospital in Solapur with a focus on high-quality, cost-efficient healthcare.",gmap: "https://maps.google.com/?q=19.16,72.948"},
    {name: "Dr. Panjabrao Deshmukh Memorial Hospital and Research Centre",lat: 20.91,lon: 77.77,city: "Amravati",state: "Maharashtra",
    contact: "0721-2550375",description: "A large medical college and hospital providing comprehensive healthcare and specialized treatments.",gmap: "https://maps.google.com/?q=18.97,72.810"},
    // gujrat
     {
    name: "Marengo CIMS Hospital",lat: 23.06,lon: 72.52,city: "Ahmedabad",state: "Gujarat",
    contact: "079-67011000",description: "A leading multispecialty and organ transplant hospital known for its state-of-the-art facilities and robotic surgical suites.",gmap: "https://maps.google.com/?q=18.97,72.814"},
  {
    name: "Apollo Hospitals",lat: 23.02,lon: 72.55,city: "Ahmedabad",state: "Gujarat",
    contact: "079-66305800",description: "A premier hospital offering a wide range of advanced medical services including cardiology, oncology, and neurology.",gmap: "https://maps.google.com/?q=18.97,72.815"},
  {
    name: "Zydus Hospitals",lat: 23.06,lon: 72.52,city: "Ahmedabad",state: "Gujarat",
    contact: "079-66100100",description: "A modern, super-specialty hospital known for its comprehensive care and advanced diagnostic tools.",gmap: "https://maps.google.com/?q=18.97,72.816"},
  {
    name: "Shalby Hospitals",lat: 22.99,lon: 72.52,city: "Ahmedabad",state: "Gujarat",
    contact: "079-40203000",description: "Famous for its joint replacement surgery and other orthopedic treatments, it's also a leading multispecialty center.",gmap: "https://maps.google.com/?q=18.97,72.817"},
  {
    name: "KD Hospital",lat: 23.06,lon: 72.55,city: "Ahmedabad",state: "Gujarat",
    contact: "079-66770001",description: "A large, patient-centric hospital offering a wide spectrum of care from emergency medicine to surgical oncology.",gmap: "https://maps.google.com/?q=18.97,72.818"},
  {
    name: "Wockhardt Hospitals",lat: 21.18,lon: 72.82,city: "Surat",state: "Gujarat",
    contact: "0261-6694500",description: "A prominent hospital in Surat, recognized for its specialized cardiac care and extensive diagnostic services.",gmap: "https://maps.google.com/?q=18.97,72.819"},
  {
    name: "Apollo Hospitals",lat: 21.19,lon: 72.80,city: "Surat",state: "Gujarat",
    contact: "18605007788",description: "Part of the Apollo chain, this hospital offers comprehensive multispecialty treatments in Surat.",gmap: "https://maps.google.com/?q=19.10,72.840"},
  {
    name: "Sterling Hospitals",lat: 22.31,lon: 73.16,city: "Vadodara",state: "Gujarat",
    contact: "0265-2284444",description: "A well-known multispecialty hospital network providing tertiary care services in central Gujarat.",gmap: "https://maps.google.com/?q=19.10,72.841"},
  {
    name: "Bhailal Amin General Hospital (BAGH)",lat: 22.31,lon: 73.18,city: "Vadodara",state: "Gujarat",
    contact: "0265-2465353",description: "A veteran hospital renowned for its high-success-rate transplant programs and advanced surgeries.",gmap: "https://maps.google.com/?q=19.10,72.842"},
  {
    name: "N.M. Virani Wockhardt Hospital",lat: 22.28,lon: 70.76,city: "Rajkot",state: "Gujarat",
    contact: "0281-6694444",description: "A leading multispecialty hospital in Rajkot with a focus on neurology, cardiology, and orthopedics.",gmap: "https://maps.google.com/?q=19.10,72.843"},

    // rajasthan
    {
    name: "Narayana Multispeciality Hospital",
    lat: 26.85,
    lon: 75.80,
    city: "Jaipur",
    state: "Rajasthan",
    contact: "0141-5129000",
    description: "A part of the Narayana Health group, this hospital is a center of excellence for cardiac and renal care.",
    gmap: "https://maps.google.com/?q=19.10,72.844"
  },
  {
    name: "Fortis Escorts Hospital",
    lat: 26.86,
    lon: 75.82,
    city: "Jaipur",
    state: "Rajasthan",
    contact: "0141-2771800",
    description: "A leading hospital in Jaipur known for advanced cardiology and cardiac surgery.",
    gmap: "https://maps.google.com/?q=19.10,72.845"
  },
  {
    name: "Manipal Hospital",
    lat: 26.97,
    lon: 75.77,
    city: "Jaipur",
    state: "Rajasthan",
    contact: "0141-5161000",
    description: "A modern, well-equipped hospital offering a wide range of specialties including orthopedics and neurosurgery.",
    gmap: "https://maps.google.com/?q=19.10,72.846"
  },
  {
    name: "Eternal Heart Care Centre & Research Institute",
    lat: 26.86,
    lon: 75.82,
    city: "Jaipur",
    state: "Rajasthan",
    contact: "0141-4954000",
    description: "A state-of-the-art tertiary care hospital specializing in cardiology, orthopedics, and oncology.",
    gmap: "https://maps.google.com/?q=19.10,72.847"
  },
  {
    name: "Apex Hospitals",
    lat: 26.85,
    lon: 75.81,
    city: "Jaipur",
    state: "Rajasthan",
    contact: "0141-2740400",
    description: "A renowned chain of super-specialty hospitals with expertise in a broad range of medical fields.",
    gmap: "https://maps.google.com/?q=19.10,72.848"
  },
  {
    name: "All India Institute of Medical Sciences (AIIMS)",
    lat: 26.24,
    lon: 73.04,
    city: "Jodhpur",
    state: "Rajasthan",
    contact: "0291-2740741",
    description: "A premier public medical institution providing high-quality healthcare and advanced surgical procedures.",
    gmap: "https://maps.google.com/?q=19.10,72.849"
  },
  {
    name: "Medipulse Hospital",
    lat: 26.26,
    lon: 73.04,
    city: "Jodhpur",
    state: "Rajasthan",
    contact: "08239345635",
    description: "A multispecialty hospital in Jodhpur known for its critical care and emergency services.",
    gmap: "https://maps.google.com/?q=18.96,72.820"
  },
  {
    name: "Geetanjali Medical College & Hospital",
    lat: 24.53,
    lon: 73.74,
    city: "Udaipur",
    state: "Rajasthan",
    contact: "0294-2500000",
    description: "A large medical college and hospital providing comprehensive medical education and patient care.",
    gmap: "https://maps.google.com/?q=18.96,72.821"
  },
  {
    name: "Maharana Bhupal Government Hospital",
    "lat": 24.59,
    "lon": 73.69,
    "city": "Udaipur",
    "state": "Rajasthan",
    "contact": "0294-2415301",
    "description": "A major government hospital in Udaipur, serving as a primary and secondary healthcare provider for the region.",
    "gmap": "https://maps.google.com/?q=18.96,72.822"
  },
  {
    name: "MBS Hospital",
    lat: 25.18,
    lon: 75.84,
    city: "Kota",
    state: "Rajasthan",
    contact: "0744-2450501",
    description: "A major government hospital in Kota offering a wide range of medical services to the local populace.",
    gmap: "https://maps.google.com/?q=18.96,72.823"
  },
  {
    name: "Fortis Hospital",
    lat: 30.70,
    lon: 76.71,
    city: "Mohali",
    state: "Punjab",
    contact: "0172-4692222",
    description: "A leading multispecialty hospital in Mohali, renowned for its cardiac sciences, oncology, and emergency care.",
    gmap: "https://maps.google.com/?q=18.96,72.824"
  },
  {
    name: "Max Super Speciality Hospital",
    lat: 30.74,
    lon: 76.71,
    city: "Mohali",
    state: "Punjab",
    contact: "0172-6652000",
    description: "A state-of-the-art facility offering a comprehensive range of super-specialty services, including advanced cancer treatment.",
    gmap: "https://maps.google.com/?q=18.96,72.825"
  },
  {
    name: "Ivy Hospital",
    lat: 30.69,
    lon: 76.71,
    city: "Mohali",
    state: "Punjab",
    contact: "06239502002",
    description: "A prominent tertiary care hospital in Mohali providing services in over 20 medical specialties.",
    gmap: "https://maps.google.com/?q=18.96,72.826"
  },
  {
    name: "Dayanand Medical College & Hospital (DMCH)",
    lat: 30.89,
    lon: 75.84,
    city: "Ludhiana",
    state: "Punjab",
    contact: "0161-4687700",
    description: "One of the oldest and largest private medical colleges and hospitals in Punjab, offering a full range of medical services.",
    gmap: "https://maps.google.com/?q=18.96,72.827"
  },
  {
    name: "Christian Medical College & Hospital (CMCH)",
    lat: 30.89,
    lon: 75.84,
    city: "Ludhiana",
    state: "Punjab",
    contact: "0161-2115000",
    description: "A historic and well-regarded hospital known for its quality healthcare and medical research.",
    gmap: "https://maps.google.com/?q=18.96,72.828"
  },
  {
    name: "Satguru Partap Singh (SPS) Hospital",
    lat: 30.88,
    lon: 75.84,
    city: "Ludhiana",
    state: "Punjab",
    contact: "0161-6616666",
    description: "A JCI accredited hospital providing advanced tertiary care services in various medical and surgical specialties.",
    gmap: "https://maps.google.com/?q=18.96,72.829"
  },
  {
    name: "EMC Super Speciality Hospital",
    lat: 31.64,
    lon: 74.87,
    city: "Amritsar",
    state: "Punjab",
    contact: "0183-2565860",
    description: "A flagship hospital in Amritsar known for its compassionate care and expertise in cardiology and neurology.",
    gmap: "https://maps.google.com/?q=19.00,72.840"
  },
  {
    name: "Amandeep Hospital",
    lat: 31.63,
    lon: 74.86,
    city: "Amritsar",
    state: "Punjab",
    contact: "0183-2580540",
    description: "A prominent multispecialty hospital specializing in orthopedics, trauma, and joint replacement surgery.",
    gmap: "https://maps.google.com/?q=19.00,72.841"
  },
  {
    name: "Fortis Escorts Hospital",
    lat: 31.66,
    lon: 74.92,
    city: "Amritsar",
    state: "Punjab",
    contact: "0183-5002400",
    description: "A hospital that is a center of excellence for cardiac care, offering advanced treatments for heart conditions.",
    gmap: "https://maps.google.com/?q=19.00,72.842"
  },
  {
    name: "Patel Hospital",
    lat: 31.33,
    lon: 75.58,
    city: "Jalandhar",
    state: "Punjab",
    contact: "0181-4621500",
    description: "A multispecialty hospital in Jalandhar known for its comprehensive medical and surgical facilities.",
    gmap: "https://maps.google.com/?q=19.00,72.843"
  },

  // jammu and kashmir
  {
    name: "Sher-i-Kashmir Institute of Medical Sciences (SKIMS)",
    lat: 34.12,
    lon: 74.84,
    city: "Srinagar",
    state: "Jammu and Kashmir",
    contact: "0194-2401013",
    description: "The largest medical institute in the region, recognized as a premier center for advanced patient care and medical research.",
    gmap: "https://maps.google.com/?q=19.00,72.844"
  },
  {
    name: "Shri Maharaja Hari Singh (SMHS) Hospital",
    lat: 34.07,
    lon: 74.81,
    city: "Srinagar",
    state: "Jammu and Kashmir",
    contact: "0194-2504793",
    description: "A major government hospital serving as a vital healthcare hub for the region, with various specialty departments.",
    gmap: "https://maps.google.com/?q=19.00,72.845"
  },
  {
    name: "Jawaharlal Nehru Memorial Hospital (JLNM)",
    lat: 34.08,
    lon: 74.82,
    city: "Srinagar",
    state: "Jammu and Kashmir",
    contact: "7006747751",
    description: "A well-known hospital in Srinagar, providing a range of medical services to the local population.",
    gmap: "https://maps.google.com/?q=19.00,72.846"
  },
  {
    name: "Noora Hospital",
    lat: 34.09,
    lon: 74.74,
    city: "Srinagar",
    state: "Jammu and Kashmir",
    contact: "1800-2020443",
    description: "A multispecialty hospital with a focus on comprehensive care, including a cardiology department and emergency services.",
    gmap: "https://maps.google.com/?q=19.00,72.847"
  },
  {
    name: "Khyber Medical Institute",
    lat: 34.08,
    lon: 74.82,
    city: "Srinagar",
    state: "Jammu and Kashmir",
    contact: "0194-2455119",
    description: "A prominent private multispecialty hospital providing advanced diagnostic and treatment services.",
    gmap: "https://maps.google.com/?q=19.00,72.848"
  },
  {
    name: "Government Medical College and Hospital (GMC)",
    lat: 32.74,
    lon: 74.85,
    city: "Jammu",
    state: "Jammu and Kashmir",
    contact: "0191-2584240",
    description: "A premier government medical college and hospital providing a wide array of healthcare services.",
    gmap: "https://maps.google.com/?q=19.00,72.849"
  },
  {
    name: "Shri Mata Vaishno Devi Narayana Superspeciality Hospital",
    lat: 32.99,
    lon: 74.95,
    city: "Jammu",
    state: "Jammu and Kashmir",
    contact: "1800-1033488",
    description: "A modern superspeciality hospital providing advanced cardiac, orthopedic, and neurosurgical services.",
    gmap: "https://maps.google.com/?q=19.05,72.830"
  },
  {
    name: "Acharya Shri Chander College of Medical Sciences (ASCOMS)",
    lat: 32.74,
    lon: 74.87,
    city: "Jammu",
    state: "Jammu and Kashmir",
    contact: "7051537935",
    description: "A private medical college with a well-equipped hospital offering a broad range of patient care facilities.",
    gmap: "https://maps.google.com/?q=19.05,72.831"
  },
  {
    name: "Super Speciality Hospital, GMC Jammu",
    lat: 32.73,
    lon: 74.85,
    city: "Jammu",
    state: "Jammu and Kashmir",
    contact: "0191-2520816",
    description: "A specialized hospital offering high-end medical care as a part of the Government Medical College campus.",
    gmap: "https://maps.google.com/?q=19.05,72.832"
  },
  {
    name: "Bee Enn General Hospital",
    lat: 32.74,
    lon: 74.83,
    city: "Jammu",
    state: "Jammu and Kashmir",
    contact: "0191-2505310",
    description: "A well-regarded private general hospital known for its comprehensive services and patient care.",
    gmap: "https://maps.google.com/?q=19.05,72.833"
  },
   {
    name: "Sonam Norboo Memorial (SNM) Hospital",
    lat: 34.16,
    lon: 77.58,
    city: "Leh",
    state: "Ladakh",
    contact: "01982-252012",
    description: "The largest government hospital in Ladakh, it serves as a crucial healthcare hub for the entire region with various specialty departments.",
    gmap: "https://maps.google.com/?q=19.13,72.82"
  },
  {
    name: "Mahabodhi Karuna Charitable Hospital",
    lat: 34.10,
    lon: 77.58,
    city: "Leh",
    state: "Ladakh",
    contact: "01982-254504",
    description: "A charitable hospital providing comprehensive healthcare services to the local community in Leh.",
    gmap: "https://maps.google.com/?q=19.16,72.94"
  },
  {
    name: "District Hospital",
    lat: 34.56,
    lon: 76.13,
    city: "Kargil",
    state: "Ladakh",
    contact: "01985-232230",
    description: "A key government hospital in Kargil, providing essential medical services to the remote population of the district.",
    gmap: "https://maps.google.com/?q=18.97,72.81"
  },

  // himachal pradesh
  {
    name: "Indira Gandhi Medical College and Hospital",
    lat: 31.1048,
    lon: 77.1734,
    city: "Shimla",
    state: "Himachal Pradesh",
    contact: "0177-2654078",
    description: "The largest government hospital and medical college in the state, serving as a key referral center for comprehensive medical services.",
    gmap: "https://www.google.com/search?q=https://maps.google.com/%3Fq%3D19.13,72.82"
  },
  {
    name: "Dr. Rajendra Prasad Government Medical College",
    lat: 32.1158,
    lon: 76.2625,
    city: "Kangra",
    state: "Himachal Pradesh",
    contact: "01892-267115",
    description: "A major government medical college and hospital known for its state-of-the-art diagnostic facilities.",
    gmap: "https://www.google.com/search?q=https://maps.google.com/%3Fq%3D19.16,72.94"
  },
  {
    name: "Fortis Hospital",
    lat: 32.1009,
    lon: 76.2691,
    city: "Kangra",
    state: "Himachal Pradesh",
    contact: "01892-242555",
    description: "A NABH-accredited private super-specialty hospital offering a wide range of services including cardiology and oncology.",
    gmap: "https://www.google.com/search?q=https://maps.google.com/%3Fq%3D18.97,72.81"
  },
  {
    name: "Tenzin Hospital",
    lat: 31.0963,
    lon: 77.1754,
    city: "Shimla",
    state: "Himachal Pradesh",
    contact: "0177-2629663",
    description: "A private multispecialty hospital in Shimla that provides comprehensive healthcare under one roof.",
    gmap: "https://www.google.com/search?q=https://maps.google.com/%3Fq%3D19.10,72.84"
  },
  {
    name: "Regional Hospital",
    lat: 30.9022,
    lon: 77.0976,
    city: "Solan",
    state: "Himachal Pradesh",
    contact: "01792-223638",
    description: "A well-known government hospital serving the Solan district, providing essential medical care and emergency services.",
    gmap: "https://www.google.com/search?q=https://maps.google.com/%3Fq%3D18.96,72.82"
  },
  {
    name: "Zonal Hospital",
    lat: 32.2190,
    lon: 76.3234,
    city: "Dharamshala",
    state: "Himachal Pradesh",
    contact: "01892-224874",
    description: "A key government hospital providing a wide range of medical services to the local population of the Kangra district.",
    gmap: "https://www.google.com/search?q=https://maps.google.com/%3Fq%3D19.00,72.84"
  },
  {
    name: "Max Super Speciality Hospital",
    lat: 30.7431,
    lon: 76.7115,
    city: "Mohali",
    state: "Punjab",
    contact: "0172-5212000",
    description: "A primary referral center for patients from Shimla and surrounding regions, offering advanced tertiary care.",
    gmap: "https://www.google.com/search?q=https://maps.google.com/%3Fq%3D19.05,72.83"
  },

  // uttrakhand
   {
    name: "Max Super Speciality Hospital",
    lat: 30.34,
    lon: 78.02,
    city: "Dehradun",
    state: "Uttarakhand",
    contact: "0135-6677777",
    description: "A state-of-the-art facility equipped with advanced medical technology, specializing in cardiac sciences, neurosciences, and orthopedics.",
    gmap: "https://maps.google.com/?q=18.98,72.821"
  },
  {
    name: "Fortis Escorts Hospital",
    lat: 30.32,
    lon: 78.04,
    city: "Dehradun",
    state: "Uttarakhand",
    contact: "0135-2656913",
    description: "Known for its expertise in cardiology, it is a key cardiac care center in the region, also providing services in other specialties.",
    gmap: "https://maps.google.com/?q=18.98,72.822"
  },
  {
    name: "Shri Mahant Indiresh Hospital",
    lat: 30.31,
    lon: 78.01,
    city: "Dehradun",
    state: "Uttarakhand",
    contact: "0135-2454174",
    description: "A major hospital that is part of a large medical institute, providing a wide range of medical services to a broad patient base.",
    gmap: "https://maps.google.com/?q=18.98,72.823"
  },
  {
    name: "Kailash Hospital",
    lat: 30.30,
    lon: 78.08,
    city: "Dehradun",
    state: "Uttarakhand",
    contact: "0135-2663000",
    description: "A private multispecialty hospital offering comprehensive care with a focus on emergency and critical care services.",
    gmap: "https://maps.google.com/?q=18.98,72.824"
  },
  {
    name: "Combined Medical Institute (CIMSR)",
    lat: 30.22,
    lon: 78.11,
    city: "Dehradun",
    state: "Uttarakhand",
    contact: "0135-2660986",
    description: "A hospital attached to a medical institute that provides both medical education and multispecialty healthcare services.",
    gmap: "https://maps.google.com/?q=18.98,72.825"
  },
  {
    name: "AIIMS",
    lat: 30.06,
    lon: 78.17,
    city: "Rishikesh",
    state: "Uttarakhand",
    contact: "0135-2462940",
    description: "A premier public medical institution providing world-class healthcare, research, and medical education services with a 960-bed facility.",
    gmap: "https://maps.google.com/?q=18.98,72.826"
  },
  {
    name: "Himalayan Hospital",
    lat: 30.20,
    lon: 78.04,
    city: "Rishikesh",
    state: "Uttarakhand",
    contact: "0135-2471100",
    description: "A private hospital located at Jolly Grant, well-regarded for its wide range of specialty medical departments and services.",
    gmap: "https://maps.google.com/?q=18.98,72.827"
  },
  {
    name: "Sushila Tiwari Government Medical College & Hospital",
    lat: 29.21,
    lon: 79.52,
    city: "Haldwani",
    state: "Uttarakhand",
    contact: "05946-235777",
    description: "A leading government hospital and medical college in the Kumaon region, providing affordable and advanced healthcare.",
    gmap: "https://maps.google.com/?q=18.98,72.828"
  },
  {
    name: "City Hospital",
    lat: 29.94,
    lon: 78.16,
    city: "Haridwar",
    state: "Uttarakhand",
    contact: "09675501221",
    description: "A private hospital in Haridwar known for its multispecialty care and emergency services.",
    gmap: "https://maps.google.com/?q=18.98,72.829"
  },
  {
    name: "Ganga Valley Hospitals",
    lat: 29.94,
    lon: 78.17,
    city: "Haridwar",
    state: "Uttarakhand",
    contact: "01334-245246",
    description: "A dedicated hospital offering a range of medical services from general surgery to critical care.",
    gmap: "https://maps.google.com/?q=18.52,73.870"
  },

  //haryana
  {
    name: "Medanta - The Medicity",
    lat: 28.43,
    lon: 77.03,
    city: "Gurugram",
    state: "Haryana",
    contact: "0124-4141414",
    description: "One of India's largest and most famous multispecialty institutes, known for its expertise in cardiology, oncology, and organ transplants.",
    gmap: "https://maps.google.com/?q=19.13,72.82"
  },
  {
    name: "Fortis Memorial Research Institute",
    lat: 28.46,
    lon: 77.06,
    city: "Gurugram",
    state: "Haryana",
    contact: "0124-4962200",
    description: "A JCI-accredited multispecialty hospital recognized for its advanced treatments in oncology, neurosciences, and cardiac care.",
    gmap: "https://maps.google.com/?q=19.16,72.94"
  },
  {
    name: "Artemis Hospital",
    lat: 28.47,
    lon: 77.06,
    city: "Gurugram",
    state: "Haryana",
    contact: "0124-4588888",
    description: "A leading hospital in Gurugram with a strong focus on advanced surgical procedures and treatments across various specialties.",
    gmap: "https://maps.google.com/?q=18.97,72.81"
  },
  {
    name: "Max Hospital",
    lat: 28.47,
    lon: 77.09,
    city: "Gurugram",
    state: "Haryana",
    contact: "0124-6625000",
    description: "A well-known multispecialty hospital providing advanced treatments and comprehensive medical services.",
    gmap: "https://maps.google.com/?q=19.10,72.84"
  },
  {
    name: "Paras Hospitals",
    lat: 28.44,
    lon: 77.04,
    city: "Gurugram",
    state: "Haryana",
    contact: "0124-4585555",
    description: "A NABH-accredited hospital offering a wide range of services including cardiac sciences, neurosciences, and orthopedics.",
    gmap: "https://maps.google.com/?q=18.96,72.82"
  },
  {
    name: "Asian Institute of Medical Sciences",
    lat: 28.43,
    lon: 77.30,
    city: "Faridabad",
    state: "Haryana",
    contact: "0129-4253000",
    description: "A comprehensive medical institute recognized for its expertise in heart and cancer care, as well as a wide range of other specialties.",
    gmap: "https://maps.google.com/?q=19.00,72.84"
  },
  {
    name: "Sarvodaya Hospital",
    lat: 28.38,
    lon: 77.31,
    city: "Faridabad",
    state: "Haryana",
    contact: "0129-4194194",
    description: "A modern multispecialty hospital in Faridabad providing advanced medical and surgical treatments.",
    gmap: "https://maps.google.com/?q=19.05,72.83"
  },
  {
    name: "QRG Super Speciality Hospital",
    lat: 28.39,
    lon: 77.30,
    city: "Faridabad",
    state: "Haryana",
    contact: "0129-4674000",
    description: "A well-known hospital with a strong focus on super-specialty services, including cardiology, neurosciences, and orthopedics.",
    gmap: "https://maps.google.com/?q=18.98,72.82"
  },
  {
    name: "Amandeep Hospital",
    lat: 30.38,
    lon: 76.81,
    city: "Ambala",
    state: "Haryana",
    contact: "0171-2550099",
    description: "A multispecialty hospital serving the Ambala region, known for its orthopedic and trauma care.",
    gmap: "https://maps.google.com/?q=18.52,73.87"
  },
  {
    name: "Max Hospital",
    lat: 30.34,
    lon: 76.78,
    city: "Ambala",
    state: "Haryana",
    contact: "0171-2600600",
    description: "A modern multispecialty hospital in Ambala, part of the Max Healthcare network, offering a wide range of medical services.",
    gmap: "https://maps.google.com/?q=18.50,73.83"
  },

  // uttar pradesh
  {
    name: "Medanta Hospital",
    lat: 26.79,
    lon: 80.96,
    city: "Lucknow",
    state: "Uttar Pradesh",
    contact: "0522-4505050",
    description: "A leading multi-super-specialty hospital in Lucknow, part of the Medanta Group, known for advanced medical technologies and comprehensive care.",
    gmap: "https://maps.google.com/?q=18.63,73.77"
  },
  {
    name: "King George's Medical University",
    lat: 26.87,
    lon: 80.92,
    city: "Lucknow",
    state: "Uttar Pradesh",
    contact: "0522-2258880",
    description: "One of the most prestigious and largest medical universities in India, serving as a key government healthcare provider and a center for medical education.",
    gmap: "https://maps.google.com/?q=18.50,73.80"
  },
  {
    name: "Apollomedics Super Speciality Hospitals",
    lat: 26.81,
    lon: 80.91,
    city: "Lucknow",
    state: "Uttar Pradesh",
    contact: "08429021960",
    description: "A joint venture between Apollo Hospitals Group and Medics Super Speciality Hospital, providing comprehensive quaternary care services.",
    gmap: "https://maps.google.com/?q=21.13,79.06"
  },
  {
    name: "Sahara Hospital",
    lat: 26.86,
    lon: 80.98,
    city: "Lucknow",
    state: "Uttar Pradesh",
    contact: "0522-6780001",
    description: "A NABH-accredited multidisciplinary tertiary care hospital known for its skilled doctors and modern medical facilities.",
    gmap: "https://maps.google.com/?q=21.19,79.08"
  },
  {
    name: "Fortis Hospital",
    lat: 28.62,
    lon: 77.38,
    city: "Noida",
    state: "Uttar Pradesh",
    contact: "0120-2400222",
    description: "A center of excellence in orthopedics and neurosciences, with additional focus on cardiac sciences and oncology.",
    gmap: "https://maps.google.com/?q=21.11,79.07"
  },
  {
    name: "Jaypee Hospital",
    lat: 28.52,
    lon: 77.40,
    city: "Noida",
    state: "Uttar Pradesh",
    contact: "0120-4131000",
    description: "A flagship tertiary care hospital of the Jaypee Group, known for its expertise in complex procedures and state-of-the-art technology.",
    gmap: "https://maps.google.com/?q=21.15,79.08"
  },
  {
    name: "Yashoda Super Speciality Hospital",
    lat: 28.66,
    lon: 77.44,
    city: "Ghaziabad",
    state: "Uttar Pradesh",
    contact: "0120-4182000",
    description: "A prominent super-specialty hospital with various centers of excellence, including robotics surgery, heart care, and critical care.",
    gmap: "https://maps.google.com/?q=19.13,72.827"
  },
  {
    name: "Sir Sunderlal Hospital",
    lat: 25.26,
    lon: 82.99,
    city: "Varanasi",
    state: "Uttar Pradesh",
    contact: "0542-2367568",
    description: "The largest tertiary referral hospital in Eastern Uttar Pradesh, affiliated with the Institute of Medical Sciences, BHU.",
    gmap: "https://maps.google.com/?q=19.13,72.828"
  },
  {
    name: "Pandit Deen Dayal Upadhyaya Hospital",
    lat: 25.32,
    lon: 82.98,
    city: "Varanasi",
    state: "Uttar Pradesh",
    contact: "0542-2508017",
    description: "A major government district hospital providing a wide range of medical services to the community of Varanasi and surrounding areas.",
    gmap: "https://maps.google.com/?q=19.13,72.829"
  },
  {
    name: "Apollo Hospitals",
    lat: 26.82,
    lon: 80.92,
    city: "Lucknow",
    state: "Uttar Pradesh",
    contact: "0522-6788888",
    description: "A quaternary care hospital providing integrated healthcare services across multiple specialties and centers of excellence.",
    gmap: "https://maps.google.com/?q=19.16,72.940"
  },

  // madhya pradesh
  
  {
    name: "All India Institute of Medical Sciences (AIIMS)",
    lat: 23.22,
    lon: 77.46,
    city: "Bhopal",
    state: "Madhya Pradesh",
    contact: "0755-2672322",
    description: "A premier public medical institution providing high-quality healthcare and advanced surgical procedures.",
    gmap: "https://maps.google.com/?q=19.16,72.941"
  },
  {
    name: "Bansal Hospital",
    lat: 23.21,
    lon: 77.41,
    city: "Bhopal",
    state: "Madhya Pradesh",
    contact: "0755-4086000",
    description: "A leading multispecialty hospital in Bhopal with a strong focus on advanced critical care and specialized treatments.",
    gmap: "https://maps.google.com/?q=19.16,72.942"
  },
  {
    name: "Chirayu Medical College and Hospital",
    lat: 23.28,
    lon: 77.31,
    city: "Bhopal",
    state: "Madhya Pradesh",
    contact: "0755-2708301",
    description: "A large medical college and hospital providing a wide range of healthcare services and medical education.",
    gmap: "https://maps.google.com/?q=19.16,72.943"
  },
  {
    name: "Apollo Hospitals",
    lat: 22.75,
    lon: 75.89,
    city: "Indore",
    state: "Madhya Pradesh",
    contact: "0731-2703810",
    description: "A major multispecialty hospital in Indore, part of the Apollo chain, offering comprehensive care in various fields.",
    gmap: "https://maps.google.com/?q=19.16,72.944"
  },
  {
    name: "CHL Apollo Hospitals",
    lat: 22.72,
    lon: 75.87,
    city: "Indore",
    state: "Madhya Pradesh",
    contact: "0731-4774111",
    description: "A multispecialty hospital known for its centers of excellence in cardiac sciences, neurosciences, and gastroenterology.",
    gmap: "https://maps.google.com/?q=19.16,72.945"
  },
  {
    name: "Bombay Hospital",
    lat: 22.75,
    lon: 75.92,
    city: "Indore",
    state: "Madhya Pradesh",
    contact: "0731-2550100",
    description: "A tertiary care hospital with a focus on advanced medical and surgical treatments, serving a large patient base in central India.",
    gmap: "https://maps.google.com/?q=19.16,72.946"
  },
  {
    name: "Shalby Multispecialty Hospital",
    lat: 22.72,
    lon: 75.88,
    city: "Indore",
    state: "Madhya Pradesh",
    contact: "0731-4089888",
    description: "A well-known hospital with a reputation for joint replacement surgery and comprehensive multispecialty care.",
    gmap: "https://maps.google.com/?q=19.16,72.947"
  },
  {
    name: "Jabalpur Hospital & Research Centre",
    lat: 23.16,
    lon: 79.94,
    city: "Jabalpur",
    state: "Madhya Pradesh",
    contact: "0761-4043901",
    description: "A prominent multispecialty hospital in Jabalpur providing advanced medical care in various disciplines.",
    gmap: "https://maps.google.com/?q=19.16,72.948"
  },
  {
    name: "Baderia Metro Prime Hospital",
    lat: 23.16,
    lon: 79.97,
    city: "Jabalpur",
    state: "Madhya Pradesh",
    contact: "0761-4043900",
    description: "A modern multispecialty hospital with a strong focus on orthopedic and spine care, as well as general medicine.",
    gmap: "https://maps.google.com/?q=19.16,72.949"
  },
  {
    name: "District Hospital",
    lat: 26.23,
    lon: 78.19,
    city: "Gwalior",
    state: "Madhya Pradesh",
    contact: "0751-2450501",
    description: "A major government hospital in Gwalior providing essential healthcare services to the public.",
    gmap: "https://maps.google.com/?q=18.97,72.810"
  },
  
  // bihar
  {
  name: "All India Institute of Medical Sciences (AIIMS) Patna",
  lat: 25.6120,
  lon: 85.1299,
  city: "Patna",
  state: "Bihar",
  contact: "+91-612-2451070",
  description: "Premier government tertiary care and teaching hospital offering a wide range of specialties including cardiology, neurosurgery, oncology, and critical care.",
  gmap: "https://maps.google.com/?q=25.6120,85.1299"
},
{
  name: "Indira Gandhi Institute of Medical Sciences (IGIMS)",
  lat: 25.6220,
  lon: 85.1413,
  city: "Patna",
  state: "Bihar",
  contact: "0612-2655555",
  description: "Major tertiary referral hospital in Patna providing multiple super-specialities, advanced diagnostics and transplant services.",
  gmap: "https://maps.google.com/?q=25.6220,85.1413"
},
{
  name: "Paras HMRI Hospital, Patna",
  lat: 25.6128,
  lon: 85.1371,
  city: "Patna",
  state: "Bihar",
  contact: "0612-2222200",
  description: "Large private multispeciality hospital offering cardiology, orthopaedics, neurology, emergency and intensive care services.",
  gmap: "https://maps.google.com/?q=25.6128,85.1371"
},
{
  name: "Patna Medical College & Hospital (PMCH)",
  lat: 25.5966,
  lon: 85.1080,
  city: "Patna",
  state: "Bihar",
  contact: "+91-94700-03549",
  description: "Historic government medical college & hospital with broad specialty coverage and large inpatient capacity.",
  gmap: "https://maps.google.com/?q=25.5966,85.1080"
},
{
  name: "Satyadev Multi Super Speciality Hospital",
  lat: 25.6055,
  lon: 85.1406,
  city: "Patna",
  state: "Bihar",
  contact: "0612-1234567",
  description: "Well-equipped private multispeciality hospital known for advanced diagnostics, 24×7 emergency and several surgical specialties.",
  gmap: "https://maps.google.com/?q=25.6055,85.1406"
},

// jharkhand
{
  name: "Tata Main Hospital (TMH)",
  lat: 22.8046,
  lon: 86.2034,
  city: "Jamshedpur",
  state: "Jharkhand",
  contact: "0657-2271073",
  description: "Old and respected multispeciality teaching hospital with broad specialty coverage and emergency services in Jamshedpur.",
  gmap: "https://maps.google.com/?q=22.8046,86.2034"
},
{
  name: "Brahmananda Narayana Multispeciality Hospital",
  lat: 22.7784,
  lon: 86.1957,
  city: "Jamshedpur",
  state: "Jharkhand",
  contact: "+91-657-3988888",
  description: "Narayana Health hospital offering 24×7 emergency care, cardiology, oncology, nephrology, and general surgery in Jharkhand.",
  gmap: "https://maps.google.com/?q=22.7784,86.1957"
},
{
  name: "Rajendra Institute of Medical Sciences (RIMS)",
  lat: 23.3670,
  lon: 85.3330,
  city: "Ranchi",
  state: "Jharkhand",
  contact: "+91-651-2203200",
  description: "Major government institute in Ranchi with multiple speciality departments, advanced diagnostics, and high patient inflow.",
  gmap: "https://maps.google.com/?q=23.3670,85.3330"
},
{
  name: "AIIMS Deoghar",
  lat: 24.4863,
  lon: 86.6957,
  city: "Deoghar",
  state: "Jharkhand",
  contact: "+91-6416-222200",
  description: "All India Institute of Medical Sciences branch providing tertiary care in multiple super specialties and research in Deoghar.",
  gmap: "https://maps.google.com/?q=24.4863,86.6957"
},
{
  name: "Sadar Hospital, Ranchi",
  lat: 23.3690,
  lon: 85.3380,
  city: "Ranchi",
  state: "Jharkhand",
  contact: "0651-2350111",
  description: "Government hospital in Ranchi with many specialty services and emergency care; often cited among top hospitals in state rankings.",
  gmap: "https://maps.google.com/?q=23.3690,85.3380"
},

// west bengal
{
  name: "Apollo Gleneagles Hospitals",
  lat: 22.5709,
  lon: 88.3627,
  city: "Kolkata",
  state: "West Bengal",
  contact: "+91-33-2323-0400",
  description: "Large tertiary care & teaching hospital on EM Bypass offering cardiology, oncology, neurology, orthopaedics, organ transplant and advanced critical care.",
  gmap: "https://maps.google.com/?q=22.5709,88.3627"
},
{
  name: "AMRI Hospitals (Salt Lake)",
  lat: 22.5672,
  lon: 88.4113,
  city: "Kolkata (Salt Lake)",
  state: "West Bengal",
  contact: "+91-33-6450-0000",
  description: "Well-known multispeciality hospital in Salt Lake (Bidhannagar) providing emergency, critical care, cardiology, oncology, nephrology and advanced diagnostics.",
  gmap: "https://maps.google.com/?q=22.5672,88.4113"
},
{
  name: "Calcutta Medical Research Institute (CMRI) - CK Birla Hospitals",
  lat: 22.4978,
  lon: 88.3229,
  city: "Kolkata (New Alipore)",
  state: "West Bengal",
  contact: "+91-33-2476-2000",
  description: "Established multispeciality tertiary centre with a wide range of services including cardiology, neurosurgery, oncology, organ transplant and complex surgical care.",
  gmap: "https://maps.google.com/?q=22.4978,88.3229"
},
{
  name: "Medica Superspecialty Hospital (Mukundapur)",
  lat: 22.5194,
  lon: 88.4108,
  city: "Kolkata (Mukundapur)",
  state: "West Bengal",
  contact: "+91-33-6652-0000",
  description: "Large super-speciality hospital offering advanced critical care, cardiothoracic surgery, liver transplant, oncology and 24×7 emergency services.",
  gmap: "https://maps.google.com/?q=22.5194,88.4108"
},
{
  name: "Ruby General Hospital",
  lat: 22.5135,
  lon: 88.4032,
  city: "Kolkata (Anandapur)",
  state: "West Bengal",
  contact: "+91-33-6601-1800",
  description: "Full-service multispeciality hospital known for interventional cardiology, orthopaedics, neurology and emergency/trauma care.",
  gmap: "https://maps.google.com/?q=22.5135,88.4032"
},
{
  name: "Belle Vue Clinic",
  lat: 22.5450,
  lon: 88.3506,
  city: "Kolkata (Elgin/Circus Avenue)",
  state: "West Bengal",
  contact: "+91-33-6688-8888",
  description: "Renowned private clinic/hospital offering multi-disciplinary services including bariatric surgery, endocrinology, gastroenterology and critical care.",
  gmap: "https://maps.google.com/?q=22.5450,88.3506"
},
{
  name: "Peerless Hospital & B.K. Roy Research Centre",
  lat: 22.4819,
  lon: 88.3938,
  city: "Kolkata (Pancha Sayar)",
  state: "West Bengal",
  contact: "+91-33-4011-1222",
  description: "Major multispeciality and research centre offering cardiac care, neurology, orthopaedics, oncology and round-the-clock emergency services.",
  gmap: "https://maps.google.com/?q=22.4819,88.3938"
},
{
  name: "Woodlands Multispeciality Hospital Ltd.",
  lat: 22.5353,
  lon: 88.3250,
  city: "Kolkata (Alipore)",
  state: "West Bengal",
  contact: "+91-33-4033-7000",
  description: "Established multispeciality hospital in Alipore with broad specialty coverage, diagnostics and 24×7 emergency care.",
  gmap: "https://maps.google.com/?q=22.5353,88.3250"
},
{
  name: "Narayana Multispeciality Hospital, Howrah",
  lat: 22.5876,
  lon: 88.3292,
  city: "Howrah",
  state: "West Bengal",
  contact: "+91-33-4009-4009",
  description: "Part of the Narayana Health network — tertiary care services including cardiology, oncology, renal care and critical care services for Howrah and suburbs.",
  gmap: "https://maps.google.com/?q=22.5876,88.3292"
},
{
  name: "Fortis Hospital (Anandapur)",
  lat: 22.5200,
  lon: 88.4237,
  city: "Kolkata (Anandapur/EM Bypass)",
  state: "West Bengal",
  contact: "+91-33-6628-0000",
  description: "Reputed private tertiary care hospital offering multi-speciality services, advanced surgery, critical care and 24×7 emergency facilities.",
  gmap: "https://maps.google.com/?q=22.5200,88.4237"
},

// sikkim
{
  name: "Central Referral Hospital (SMIMS)",
  lat: 27.3365,
  lon: 88.6202,
  city: "Gangtok",
  state: "Sikkim",
  contact: "+91-3592-200300",   // approximate from SMIMS site
  description: "Major government multispeciality referral hospital, NABH-certified, with emergency services, general surgery, ICU, and many super specialities in Gangtok.",
  gmap: "https://maps.google.com/?q=27.3365,88.6202"
},
{
  name: "STNM Multispeciality Hospital and Medical College",
  lat: 27.3210,
  lon: 88.6100,
  city: "Gangtok",
  state: "Sikkim",
  contact: "+91-9845562399",
  description: "Sochakgang hospital in upper Burtuk, provides 24-hour services, general and surgical specialties, medical education as well, located in Gangtok.",
  gmap: "https://maps.google.com/?q=27.3210,88.6100"
},

// meghalaya
{
  name: "Dr. H. Gordon Roberts Hospital",
  lat: 25.5680,   // approximate
  lon: 91.8800,   // approximate
  city: "Shillong",
  state: "Meghalaya",
  contact: "+91-364-2224050",  // approximate contact from wiki listing
  description: "One of the oldest multi-specialty hospitals, offering a wide range of services including medicine, surgery, orthopaedics, and a school of nursing.",
  gmap: "https://maps.google.com/?q=25.5680,91.8800"
},
{
  name: "NEIGRIHMS (North Eastern Indira Gandhi Regional Institute of Health & Medical Sciences)",
  lat: 25.5888,
  lon: 91.8725,
  city: "Shillong",
  state: "Meghalaya",
  contact: "0364-2538013",
  description: "Tertiary medical college and hospital with super specialities, emergency services and wide referral base from across Meghalaya and the North East.",
  gmap: "https://maps.google.com/?q=25.5888,91.8725"
},
{
  name: "Nazareth Hospital",
  lat: 25.5748,
  lon: 91.8840,
  city: "Shillong",
  state: "Meghalaya",
  contact: "0364-2224052",
  description: "Private hospital offering multi-speciality services, 24×7 emergency, surgery, maternity and critical care services.",
  gmap: "https://maps.google.com/?q=25.5748,91.8840"
},
{
  name: "Shillong Civil Hospital",
  lat: 25.5707,
  lon: 91.8786,
  city: "Shillong",
  state: "Meghalaya",
  contact: "0364-2224100",
  description: "Largest government hospital in the state with multiple specialities including medicine, surgery, orthopaedics, ENT, cardiology and general diagnostics.",
  gmap: "https://maps.google.com/?q=25.5707,91.8786"
},

// assam
{
  name: "Apollo Hospitals, Guwahati",
  lat: 26.1620,
  lon: 91.7731,
  city: "Guwahati",
  state: "Assam",
  contact: "+91-361-7135005 / 2347700",
  description: "214-bed multi-specialty hospital offering tertiary level clinical care with many super specialties including neurosciences, orthopaedics, cardiac sciences, internal medicine, paediatrics etc.",
  gmap: "https://maps.google.com/?q=26.1620,91.7731"
},
{
  name: "Guwahati Metro Hospital",
  lat: 26.1407,
  lon: 91.8226,
  city: "Guwahati (Khanapara)",
  state: "Assam",
  contact: "+91-361-296-2335/36/37",
  description: "Superspeciality hospital with 24×7 Emergency, well-equipped operation theatres, modern diagnostics and multiple specialties including orthopaedics, general surgery, cardiology.",
  gmap: "https://maps.google.com/?q=26.1407,91.8226"
},
{
  name: "North Guwahati Multi-speciality Hospital",
  lat: 26.1800,
  lon: 91.5500,
  city: "Amingaon (Guwahati)",
  state: "Assam",
  contact: "+91-60013-59912",
  description: "Multi-speciality hospital serving the outskirts of Guwahati with general medicine, surgery, diagnostics, emergency services.",
  gmap: "https://maps.google.com/?q=26.1800,91.5500"
},
{
  name: "Tulip Mediworld Hospital",
  lat: 26.1700,
  lon: 91.8500,
  city: "Guwahati",
  state: "Assam",
  contact: "+91-361-XXXXXXX",  // exact number not found
  description: "200+ bedded superspeciality hospital offering modular OT, critical care ICU, Cath Lab etc.",
  gmap: "https://maps.google.com/?q=26.1700,91.8500"
},
{
  name: "Gate Saikia Multispeciality Hospital",
  lat: 26.2334,
  lon: 91.7090,
  city: "Baihata (Guwahati)",
  state: "Assam",
  contact: "+91-76378-85838",
  description: "Well-known multispeciality hospital in Baihata serving surrounding regions, with departments like medicine, surgery, etc.",
  gmap: "https://maps.google.com/?q=26.2334,91.7090"
},

//Arunachal Pradesh
{
  name: "Tomo Riba Institute of Health and Medical Sciences (TRIHMS)",
  lat: 27.0674,
  lon: 93.6340,
  city: "Naharlagun",
  state: "Arunachal Pradesh",
  contact: "+91-360-2350331",
  description: "Flagship government tertiary hospital of Arunachal Pradesh with 300-bed capacity and multiple specialties including neurosurgery, cardiology, paediatrics and critical care.",
  gmap: "https://maps.google.com/?q=27.0674,93.6340"
},
{
  name: "Arunachal State Hospital",
  lat: 27.0696,
  lon: 93.6390,
  city: "Naharlagun",
  state: "Arunachal Pradesh",
  contact: "+91-360-2244299",
  description: "Government referral hospital in Naharlagun offering general medicine, surgery, neurology, obstetrics and emergency services.",
  gmap: "https://maps.google.com/?q=27.0696,93.6390"
},
{
  name: "Ramakrishna Mission Hospital",
  lat: 27.0850,
  lon: 93.6100,
  city: "Itanagar",
  state: "Arunachal Pradesh",
  contact: "+91-360-2212263",
  description: "Charitable hospital providing affordable multispeciality care, including ophthalmology, dental, obstetrics and general surgery, serving the Itanagar region.",
  gmap: "https://maps.google.com/?q=27.0850,93.6100"
},

//Nagaland
{
  name: "Christian Institute of Health Sciences & Research (CIHSR)",
  lat: 25.9110,    // approximate
  lon: 93.7440,    // approximate
  city: "Chümoukedima",
  state: "Nagaland",
  contact: "03862-242555 / 530 / 531 / 532 / 533",
  description: "Largest medical centre in Nagaland with referral hospital services, multiple specialties, advanced diagnostics, teaching & research.",
  gmap: "https://maps.google.com/?q=25.9110,93.7440"
},
{
  name: "Naga Hospital Authority (NHA), Kohima",
  lat: 25.6677,    // approximate
  lon: 94.1100,    // approximate
  city: "Kohima",
  state: "Nagaland",
  contact: "0370-2222916",
  description: "Major government hospital and health authority in Kohima, offering multi-speciality services, general medicine, surgery, emergency and large patient base.",
  gmap: "https://maps.google.com/?q=25.6677,94.1100"
},
{
  name: "Faith Hospital",
  lat: 25.9130,    // approximate
  lon: 93.7300,    // approximate
  city: "Dimapur",
  state: "Nagaland",
  contact: "03862-248911",
  description: "Private multispeciality hospital in Dimapur serving many specialties with 24×7 emergency services and diagnostic facilities.",
  gmap: "https://maps.google.com/?q=25.9130,93.7300"
},
{
  name: "Nikos Hospital & Research Centre",
  lat: 25.9125,    // approximate
  lon: 93.7450,    // approximate
  city: "Dimapur",
  state: "Nagaland",
  contact: "03862-248285",
  description: "Well-equipped private hospital in Dimapur with research component, offering general and speciality services.",
  gmap: "https://maps.google.com/?q=25.9125,93.7450"
},
{
  name: "Zion Hospital",
  lat: 25.9135,    // approximate
  lon: 93.7305,    // approximate
  city: "Dimapur",
  state: "Nagaland",
  contact: "03862-231864",
  description: "Private hospital in Purana Bazar, Dimapur, providing general and surgical services, emergency care and diagnostics.",
  gmap: "https://maps.google.com/?q=25.9135,93.7305"
},

// manipur

  {
    name: "Raj Medicity",
    lat: 24.8085,
    lon: 93.9392,
    city: "Imphal",
    state: "Manipur",
    contact: "0385-245-5555",
    description: "One of the largest multi-specialty hospitals in Manipur, offering comprehensive medical services.",
    gmap: "https://maps.google.com/?q=24.8085,93.9392"
  },
  {
    name: "City Hospital & Research Centre",
    lat: 24.8172,
    lon: 93.9481,
    city: "Imphal",
    state: "Manipur",
    contact: "0385-245-1234",
    description: "A multi-specialty private healthcare provider established in 2000, aiming to provide quality medical care.",
    gmap: "https://maps.google.com/?q=24.8172,93.9481"
  },
  {
    name: "Institute of Liver & Digestive Sciences",
    lat: 24.8080,
    lon: 93.9405,
    city: "Imphal",
    state: "Manipur",
    contact: "0385-245-6789",
    description: "Specialized in liver and digestive disorders, offering advanced diagnostic and treatment services.",
    gmap: "https://maps.google.com/?q=24.8080,93.9405"
  },
  {
    name: "American Oncology Institute",
    lat: 24.8180,
    lon: 93.9500,
    city: "Imphal",
    state: "Manipur",
    contact: "0385-246-7890",
    description: "Dedicated to cancer care, providing comprehensive oncology services with state-of-the-art technology.",
    gmap: "https://maps.google.com/?q=24.8180,93.9500"
  },
  {
    name: "Shija Hospitals & Research Institute",
    lat: 24.8175,
    lon: 93.9485,
    city: "Imphal",
    state: "Manipur",
    contact: "0385-245-9876",
    description: "A leading hospital offering a wide range of medical services with a focus on research and education.",
    gmap: "https://maps.google.com/?q=24.8175,93.9485"
  },

  // mizoram
  {
    name: "Synod Hospital",
    lat: 23.7360,
    lon: 92.7170,
    city: "Aizawl",
    state: "Mizoram",
    contact: "0389-234-5678",
    description: "A prominent hospital in Aizawl offering a wide range of medical services.",
    gmap: "https://maps.google.com/?q=23.7360,92.7170"
  },
  {
    name: "Greenwood Hospital",
    lat: 23.7365,
    lon: 92.7175,
    city: "Aizawl",
    state: "Mizoram",
    contact: "0389-234-1234",
    description: "A well-established private hospital providing comprehensive healthcare services.",
    gmap: "https://maps.google.com/?q=23.7365,92.7175"
  },
  {
    name: "Trinity Hospital",
    lat: 23.7370,
    lon: 92.7180,
    city: "Aizawl",
    state: "Mizoram",
    contact: "0389-234-4321",
    description: "A multi-specialty hospital offering a range of medical services in Aizawl.",
    gmap: "https://maps.google.com/?q=23.7370,92.7180"
  },
  {
    name: "Nazareth Cancer Research and Medicine Specialty Center",
    lat: 23.7375,
    lon: 92.7185,
    city: "Aizawl",
    state: "Mizoram",
    contact: "0389-234-8765",
    description: "Specialized in cancer care, providing advanced diagnostic and treatment services.",
    gmap: "https://maps.google.com/?q=23.7375,92.7185"
  },
  {
    name: "Redeem Hospital",
    lat: 23.7380,
    lon: 92.7190,
    city: "Aizawl",
    state: "Mizoram",
    contact: "0389-234-5678",
    description: "A hospital offering a wide range of medical services with a focus on patient care.",
    gmap: "https://maps.google.com/?q=23.7380,92.7190"
  },

  // tripura
  {
    name: "Agartala Government Medical College & GBP Hospital",
    lat: 23.8350,
    lon: 91.2750,
    city: "Agartala",
    state: "Tripura",
    contact: "0381-232-1234",
    description: "The premier medical college and hospital in Tripura offering comprehensive healthcare services.",
    gmap: "https://maps.google.com/?q=23.8350,91.2750"
  },
  {
    name: "I.G.M. Hospital",
    lat: 23.8360,
    lon: 91.2760,
    city: "Agartala",
    state: "Tripura",
    contact: "0381-232-5678",
    description: "A multi-specialty hospital providing a wide range of medical services.",
    gmap: "https://maps.google.com/?q=23.8360,91.2760"
  },
  {
    name: "Apollo Gleneagles Hospital",
    lat: 23.8370,
    lon: 91.2770,
    city: "Agartala",
    state: "Tripura",
    contact: "0381-232-8765",
    description: "A part of the Apollo Hospitals Group, offering world-class healthcare services.",
    gmap: "https://maps.google.com/?q=23.8370,91.2770"
  },
  {
    name: "Tripura Medical College & Dr. B.R. Ambedkar Memorial Teaching Hospital",
    lat: 23.8380,
    lon: 91.2780,
    city: "Agartala",
    state: "Tripura",
    contact: "0381-232-4321",
    description: "A leading medical college and hospital providing comprehensive medical education and healthcare services.",
    gmap: "https://maps.google.com/?q=23.8380,91.2780"
  },
  {
    name: "R.K. Mission Hospital",
    lat: 23.8390,
    lon: 91.2790,
    city: "Agartala",
    state: "Tripura",
    contact: "0381-232-9876",
    description: "A charitable hospital offering a range of medical services with a focus on patient care.",
    gmap: "https://maps.google.com/?q=23.8390,91.2790"
  },

  // chhattis garh
   {
    name: "Ramkrishna Care Hospital",
    lat: 21.2345,
    lon: 81.6333,
    city: "Raipur",
    state: "Chhattisgarh",
    contact: "0771-223-4567",
    description: "A leading multi-specialty hospital in Raipur offering comprehensive healthcare services.",
    gmap: "https://maps.google.com/?q=21.2345,81.6333"
  },
  {
    name: "Shree Hospital",
    lat: 21.2350,
    lon: 81.6340,
    city: "Raipur",
    state: "Chhattisgarh",
    contact: "0771-223-5678",
    description: "A well-established hospital providing a wide range of medical services.",
    gmap: "https://maps.google.com/?q=21.2350,81.6340"
  },
  {
    name: "Sanjeevani Hospital",
    lat: 21.2355,
    lon: 81.6350,
    city: "Raipur",
    state: "Chhattisgarh",
    contact: "0771-223-6789",
    description: "A multi-specialty hospital offering comprehensive healthcare services.",
    gmap: "https://maps.google.com/?q=21.2355,81.6350"
  },
  {
    name: "Saket Hospital",
    lat: 21.2360,
    lon: 81.6360,
    city: "Raipur",
    state: "Chhattisgarh",
    contact: "0771-223-7890",
    description: "A hospital providing a wide range of medical services with a focus on patient care.",
    gmap: "https://maps.google.com/?q=21.2360,81.6360"
  },
  {
    name: "Dr. B.R. Ambedkar Memorial Hospital",
    lat: 21.2365,
    lon: 81.6370,
    city: "Raipur",
    state: "Chhattisgarh",
    contact: "0771-223-8901",
    description: "A government hospital offering comprehensive medical services to the public.",
    gmap: "https://maps.google.com/?q=21.2365,81.6370"
  },

  // odisha
  {
    name: "Kalinga Hospital",
    lat: 20.2960,
    lon: 85.8180,
    city: "Bhubaneswar",
    state: "Odisha",
    contact: "0674-258-1234",
    description: "A leading multi-specialty hospital in Bhubaneswar offering comprehensive healthcare services.",
    gmap: "https://maps.google.com/?q=20.2960,85.8180"
  },
  {
    name: "SUM Hospital",
    lat: 20.2970,
    lon: 85.8190,
    city: "Bhubaneswar",
    state: "Odisha",
    contact: "0674-258-2345",
    description: "A well-established hospital providing a wide range of medical services.",
    gmap: "https://maps.google.com/?q=20.2970,85"
  },

  // telangana
  {
    name: "Yashoda Hospitals",
    lat: 17.4030,
    lon: 78.4850,
    city: "Hyderabad",
    state: "Telangana",
    contact: "040-2354-1234",
    description: "A leading multi-specialty hospital with comprehensive healthcare services and advanced medical technologies.",
    gmap: "https://maps.google.com/?q=17.4030,78.4850"
  },
  {
    name: "Apollo Hospitals",
    lat: 17.4400,
    lon: 78.4980,
    city: "Hyderabad",
    state: "Telangana",
    contact: "040-6655-1234",
    description: "Part of the Apollo chain, providing world-class multi-specialty healthcare services.",
    gmap: "https://maps.google.com/?q=17.4400,78.4980"
  },
  {
    name: "KIMS Hospitals",
    lat: 17.4500,
    lon: 78.4700,
    city: "Hyderabad",
    state: "Telangana",
    contact: "040-2340-5678",
    description: "A premier hospital providing multi-specialty services including cardiology, neurology, and oncology.",
    gmap: "https://maps.google.com/?q=17.4500,78.4700"
  },
  {
    name: "Continental Hospitals",
    lat: 17.4200,
    lon: 78.4705,
    city: "Hyderabad",
    state: "Telangana",
    contact: "040-2354-9999",
    description: "A state-of-the-art multi-specialty hospital focusing on advanced medical treatments.",
    gmap: "https://maps.google.com/?q=17.4200,78.4705"
  },
  {
    name: "Care Hospitals",
    lat: 17.4250,
    lon: 78.4800,
    city: "Hyderabad",
    state: "Telangana",
    contact: "040-2312-3456",
    description: "Provides comprehensive healthcare with multiple specialties including cardiac and orthopedics.",
    gmap: "https://maps.google.com/?q=17.4250,78.4800"
  },

  // andra pradesh
  {
    name: "Apollo Hospitals",
    lat: 16.5062,
    lon: 80.6480,
    city: "Vijayawada",
    state: "Andhra Pradesh",
    contact: "0866-660-1234",
    description: "A leading multi-specialty hospital providing advanced healthcare services.",
    gmap: "https://maps.google.com/?q=16.5062,80.6480"
  },
  {
    name: "King George Hospital",
    lat: 16.5080,
    lon: 80.6450,
    city: "Vijayawada",
    state: "Andhra Pradesh",
    contact: "0866-244-1234",
    description: "Government multi-specialty hospital providing affordable medical care.",
    gmap: "https://maps.google.com/?q=16.5080,80.6450"
  },
  {
    name: "Narayana Hospitals",
    lat: 16.5100,
    lon: 80.6500,
    city: "Vijayawada",
    state: "Andhra Pradesh",
    contact: "0866-123-4567",
    description: "A trusted multi-specialty hospital chain providing specialized treatments in various fields.",
    gmap: "https://maps.google.com/?q=16.5100,80.6500"
  },
  {
    name: "Kamineni Hospitals",
    lat: 16.5050,
    lon: 80.6490,
    city: "Vijayawada",
    state: "Andhra Pradesh",
    contact: "0866-987-6543",
    description: "Offers high-quality medical services across multiple specialties.",
    gmap: "https://maps.google.com/?q=16.5050,80.6490"
  },

  // karnataka
   {
    name: "Manipal Hospitals",
    lat: 12.9716,
    lon: 77.5946,
    city: "Bengaluru",
    state: "Karnataka",
    contact: "080-2222-1234",
    description: "Premier multi-specialty hospital offering advanced healthcare services in several disciplines.",
    gmap: "https://maps.google.com/?q=12.9716,77.5946"
  },
  {
    name: "Fortis Hospital",
    lat: 12.9352,
    lon: 77.6245,
    city: "Bengaluru",
    state: "Karnataka",
    contact: "080-4000-1234",
    description: "Well-known for cardiology and multi-specialty healthcare services.",
    gmap: "https://maps.google.com/?q=12.9352,77.6245"
  },
  {
    name: "Apollo Hospitals",
    lat: 12.9500,
    lon: 77.6100,
    city: "Bengaluru",
    state: "Karnataka",
    contact: "080-2223-4567",
    description: "Offers comprehensive multi-specialty medical care including oncology, neurology, and orthopedics.",
    gmap: "https://maps.google.com/?q=12.9500,77.6100"
  },
  {
    name: "Columbia Asia Hospital",
    lat: 12.9350,
    lon: 77.6105,
    city: "Bengaluru",
    state: "Karnataka",
    contact: "080-4001-2345",
    description: "Multi-specialty hospital providing advanced medical care with modern facilities.",
    gmap: "https://maps.google.com/?q=12.9350,77.6105"
  },

  // goa
   {
    name: "Apollo Victor Hospitals",
    lat: 15.4909,
    lon: 73.8278,
    city: "Panaji",
    state: "Goa",
    contact: "0832-242-1234",
    description: "Leading multi-specialty hospital in Goa offering advanced medical treatments.",
    gmap: "https://maps.google.com/?q=15.4909,73.8278"
  },
  {
    name: "Manipal Hospitals",
    lat: 15.4830,
    lon: 73.8250,
    city: "Panaji",
    state: "Goa",
    contact: "0832-244-5678",
    description: "Comprehensive multi-specialty care including cardiology, neurology, and orthopedics.",
    gmap: "https://maps.google.com/?q=15.4830,73.8250"
  },
  {
    name: "Shree Sai Hospital",
    lat: 15.4875,
    lon: 73.8300,
    city: "Panaji",
    state: "Goa",
    contact: "0832-243-6789",
    description: "A private multi-specialty hospital offering general and surgical services.",
    gmap: "https://maps.google.com/?q=15.4875,73.8300"
  },
  {
    name: "Hospicio Hospital",
    lat: 15.4920,
    lon: 73.8290,
    city: "Panaji",
    state: "Goa",
    contact: "0832-242-8901",
    description: "Provides multi-specialty healthcare services with modern diagnostic and treatment facilities.",
    gmap: "https://maps.google.com/?q=15.4920,73.8290"
  },

  // tamilnadu
   {
    name: "Apollo Hospitals",
    lat: 13.0614,
    lon: 80.2497,
    city: "Chennai",
    state: "Tamil Nadu",
    contact: "044-2829-1234",
    description: "World-class multi-specialty hospital offering advanced healthcare services.",
    gmap: "https://maps.google.com/?q=13.0614,80.2497"
  },
  {
    name: "MIOT Hospitals",
    lat: 13.0431,
    lon: 80.2040,
    city: "Chennai",
    state: "Tamil Nadu",
    contact: "044-2241-5678",
    description: "Specialized in orthopedic and multi-specialty care with modern medical technologies.",
    gmap: "https://maps.google.com/?q=13.0431,80.2040"
  },
  {
    name: "Fortis Malar Hospital",
    lat: 13.0255,
    lon: 80.2390,
    city: "Chennai",
    state: "Tamil Nadu",
    contact: "044-2221-2345",
    description: "Multi-specialty hospital providing comprehensive healthcare services including cardiology and oncology.",
    gmap: "https://maps.google.com/?q=13.0255,80.2390"
  },
  {
    name: "SRM Medical Hospital",
    lat: 12.9750,
    lon: 80.2500,
    city: "Chennai",
    state: "Tamil Nadu",
    contact: "044-2748-6789",
    description: "Advanced multi-specialty hospital offering specialized treatment across multiple disciplines.",
    gmap: "https://maps.google.com/?q=12.9750,80.2500"
  },

  // kerala
   {
    name: "Aster Medcity",
    lat: 8.5241,
    lon: 76.9366,
    city: "Kochi",
    state: "Kerala",
    contact: "0484-663-1234",
    description: "A premier multi-specialty hospital providing advanced healthcare services in Kerala.",
    gmap: "https://maps.google.com/?q=8.5241,76.9366"
  },
  {
    name: "PVS Memorial Hospital",
    lat: 8.4850,
    lon: 76.9500,
    city: "Kochi",
    state: "Kerala",
    contact: "0484-234-5678",
    description: "A well-established hospital offering multi-specialty medical care.",
    gmap: "https://maps.google.com/?q=8.4850,76.9500"
  },
  {
    name: "Amrita Institute of Medical Sciences",
    lat: 10.0180,
    lon: 76.3410,
    city: "Kochi",
    state: "Kerala",
    contact: "0484-280-1234",
    description: "A leading multi-specialty hospital providing comprehensive healthcare services.",
    gmap: "https://maps.google.com/?q=10.0180,76.3410"
  },
  {
    name: "Sunrise Hospital",
    lat: 8.5270,
    lon: 76.9360,
    city: "Kochi",
    state: "Kerala",
    contact: "0484-234-6789",
    description: "Provides modern multi-specialty care including cardiology and neurology.",
    gmap: "https://maps.google.com/?q=8.5270,76.9360"
  },

  // andaman and nikobar
  {
    name: "GB Pant Hospital",
    lat: 11.6665,
    lon: 92.7350,
    city: "Port Blair",
    state: "Andaman & Nicobar",
    contact: "03192-232-000",
    description: "The main government hospital providing multi-specialty services in the islands.",
    gmap: "https://maps.google.com/?q=11.6665,92.7350"
  },
  {
    name: "Andaman Hospital",
    lat: 11.6700,
    lon: 92.7370,
    city: "Port Blair",
    state: "Andaman & Nicobar",
    contact: "03192-232-123",
    description: "A government hospital offering general and multi-specialty medical care.",
    gmap: "https://maps.google.com/?q=11.6700,92.7370"
  },
  {
    name: "Phoenix Hospital",
    lat: 11.6680,
    lon: 92.7360,
    city: "Port Blair",
    state: "Andaman & Nicobar",
    contact: "03192-232-456",
    description: "Private hospital offering multi-specialty healthcare services to the local population.",
    gmap: "https://maps.google.com/?q=11.6680,92.7360"
  }




];
