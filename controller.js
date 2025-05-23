const db = require('./config');

const validateCoords = (lat, lon) => {
  return !isNaN(lat) && !isNaN(lon) &&
         lat >= -90 && lat <= 90 &&
         lon >= -180 && lon <= 180;
};

const get_dist = (lat1, lon1, lat2, lon2) => {
  const R = 6378;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 +
            Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) *
            Math.sin(dLon/2)**2;
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

exports.addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  console.log(name, address, latitude, longitude);

  if (!name || !address || !validateCoords(latitude, longitude)) {
    return res.status(400).json({ error: 'Invalid input' });
  }
//   console.log(firstname, address, latitude, longitude);
  // First: check if the school already exists
  
      const sql = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
      const values = [name, address, latitude, longitude];

      db.query(sql, values, (err, result) => {
        if (err) {
          console.error("DB Error:", err);
          return res.status(500).json({ error: 'Database error', message: err.message });
        }

        return res.status(201).json({ message: 'School added successfully', id: result.insertId });
      });
    }




exports.listSchools = async (req, res) => {
  const { lat, lng } = req.query;
  console.log(lat, lng);
  if (!validateCoords(lat, lng)) {
    return res.status(400).json({ error: 'Invalid coordinates' });
  }

 db.query('SELECT * FROM schools', (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: 'Database error', message: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'No schools found' });
    }

    // if (results.length === 1) {
    //   return res.status(200).json(results);
    // }

    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);

    const sorted = results.map(school => ({
      ...school,
      distance: get_dist(userLat, userLng, school.latitude, school.longitude)
    })).sort((a, b) => a.distance - b.distance);

    res.status(200).json(sorted);
  });
};