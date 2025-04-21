module.exports = (req, res, next) => {
    const { title, desc, price } = req.body;
    const missingFields = [];
  
    if (!title) missingFields.push('title');
    if (!desc) missingFields.push('desc');
    if (price === undefined) missingFields.push('price'); 
  
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Följande fält saknas: ${missingFields.join(', ')}`
      });
    }
  
    if (typeof title !== 'string' || typeof desc !== 'string' || typeof price !== 'number') {
      return res.status(400).json({
        error: 'Fel datatyper: title och desc ska vara text, price ska vara ett nummer'
      });
    }
  
    next();
  };