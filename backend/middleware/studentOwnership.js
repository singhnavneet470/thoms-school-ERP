const pool = require('../config/db');
const { ROLES } = require('../config/constants');

/**
 * Middleware to enforce student self-ownership check on routes with studentId or sectionId params.
 * Allows ADMIN/SUPER_ADMIN through unconditionally; for STUDENT role, validates that the path parameter matches their own student ID or section ID.
 */
const requireOwnStudentRecord = (paramName = 'studentId', customMessage) => {
  return async (req, res, next) => {
    try {
      if (req.user && req.user.role === ROLES.STUDENT) {
        const targetId = req.params[paramName];
        if (targetId) {
          const [[student]] = await pool.query(
            'SELECT id, section_id FROM students WHERE user_id = ?',
            [req.user.id]
          );
          if (!student) {
            return res.status(403).json({ success: false, message: customMessage || 'Cannot view other student data' });
          }
          if (paramName === 'sectionId') {
            if (String(student.section_id) !== String(targetId)) {
              return res.status(403).json({ success: false, message: customMessage || 'Cannot view other student timetable' });
            }
          } else {
            if (String(student.id) !== String(targetId)) {
              return res.status(403).json({ success: false, message: customMessage || 'Cannot view other student marks' });
            }
          }
        }
      }
      next();
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };
};

module.exports = { requireOwnStudentRecord };
