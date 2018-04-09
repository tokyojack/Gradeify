INSERT INTO studentAssignments(mark, studentNumber, assignmentId, classId)
    SELECT
    ?,
    (SELECT studentNumber FROM students WHERE firstName=? AND lastName=?),
    (SELECT id FROM assignments WHERE name=? AND classId=?),
    ?;