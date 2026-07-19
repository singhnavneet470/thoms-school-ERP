const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
require('dotenv').config();

async function seed() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'school_erp'
        });

        console.log('Connected to database. Starting seed...');

        const password = 'password123';
        const hashedPassword = await bcrypt.hash(password, 8);

        // 1. Create Academic Session
        const [sessionRes] = await connection.query(`
            INSERT INTO academic_sessions (name, start_date, end_date, is_current) 
            VALUES ('2026-2027', '2026-04-01', '2027-03-31', 1)
            ON DUPLICATE KEY UPDATE is_current=1
        `);
        let sessionId = sessionRes.insertId;
        if (!sessionId) {
            let [sessRow] = await connection.query(`SELECT id FROM academic_sessions WHERE name='2026-2027'`);
            sessionId = sessRow[0].id;
        }

        // 2. Create Class and Section
        await connection.query(`
            INSERT IGNORE INTO classes (name, numeric_value) VALUES ('Class 1', 1)
        `);
        let [classRow] = await connection.query(`SELECT id FROM classes WHERE name='Class 1'`);
        const classId = classRow[0].id;

        await connection.query(`
            INSERT IGNORE INTO sections (class_id, name, capacity) VALUES (?, 'A', 40)
        `, [classId]);
        let [secRow] = await connection.query(`SELECT id FROM sections WHERE class_id=? AND name='A'`, [classId]);
        const sectionId = secRow[0].id;

        // Helper to insert user
        async function createUser(email, role, fullName) {
            let [existing] = await connection.query('SELECT id FROM users WHERE email=?', [email]);
            if (existing.length > 0) return existing[0].id;

            const [res] = await connection.query(`
                INSERT INTO users (email, password, role, full_name, status)
                VALUES (?, ?, ?, ?, 'active')
            `, [email, hashedPassword, role, fullName]);
            return res.insertId;
        }

        async function createStaff(userId, empCode, fname, lname, desc) {
            await connection.query(`
                INSERT IGNORE INTO staff_profiles (user_id, employee_code, first_name, last_name, designation)
                VALUES (?, ?, ?, ?, ?)
            `, [userId, empCode, fname, lname, desc]);
        }

        async function createStudent(userId, admnNo, fname, lname) {
            await connection.query(`
                INSERT IGNORE INTO students (user_id, admission_no, first_name, last_name, section_id, session_id)
                VALUES (?, ?, ?, ?, ?, ?)
            `, [userId, admnNo, fname, lname, sectionId, sessionId]);
        }

        // 3. Create Super Admin
        let saId = await createUser('superadmin2@erp.com', 'super_admin', 'Super Admin');
        
        // 4. Create Admins
        for(let i=1; i<=2; i++) {
            let uId = await createUser(`admin${i}@erp.com`, 'admin', `Admin ${i}`);
            await createStaff(uId, `ADM00${i}`, 'Admin', `${i}`, 'Administrator');
        }

        // 5. Create Teachers
        for(let i=1; i<=3; i++) {
            let uId = await createUser(`teacher${i}@erp.com`, 'teacher', `Teacher ${i}`);
            await createStaff(uId, `TCH00${i}`, 'Teacher', `${i}`, 'Faculty');
        }

        // 6. Create Students
        for(let i=1; i<=10; i++) {
            let uId = await createUser(`student${i}@erp.com`, 'student', `Student ${i}`);
            await createStudent(uId, `STU20260${i}`, 'Student', `${i}`);
        }

        // 7. Create Other Staff
        let pId = await createUser('principal@erp.com', 'principal', 'Principal Name');
        await createStaff(pId, 'PRN001', 'Principal', 'Name', 'Principal');

        let vpId = await createUser('vp@erp.com', 'vp', 'VP Name');
        await createStaff(vpId, 'VP001', 'VP', 'Name', 'Vice Principal');

        let cId = await createUser('cashier@erp.com', 'cashier', 'Cashier Name');
        await createStaff(cId, 'CSH001', 'Cashier', 'Name', 'Cashier');

        let rId = await createUser('receptionist@erp.com', 'receptionist', 'Receptionist Name');
        await createStaff(rId, 'REC001', 'Receptionist', 'Name', 'Receptionist');

        let bsId = await createUser('busstaff@erp.com', 'busstaff', 'Bus Staff');
        await createStaff(bsId, 'BUS001', 'Bus', 'Staff', 'Driver');

        console.log('Seed completed successfully!');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seed();
