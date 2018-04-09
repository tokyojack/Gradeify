SELECT employeeNumber FROM classes WHERE id=?;
DELETE FROM studentClasses WHERE classId=?;
DELETE FROM studentAssignments WHERE classId=?;
DELETE FROM assignments WHERE classId=?;
DELETE FROM classes WHERE id=?;