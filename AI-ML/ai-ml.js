const gradePoints = {
    'A+': 10,
    'A': 9,
    'B+': 8,
    'B': 7,
    'C+': 6,
    'C': 5,
    'D': 4,
    'F': 0
};

function getGrade(marks) {
    if (marks >= 93) return 'A+';
    if (marks >= 85) return 'A';
    if (marks >= 77) return 'B+';
    if (marks >= 69) return 'B';
    if (marks >= 61) return 'C+';
    if (marks >= 53) return 'C';
    if (marks >= 45) return 'D';
    return 'F';
}

function calculateSGPA(semester) {
    const rows = document.querySelectorAll(`#semester${semester} tr`);
    let totalCredits = 0;
    let totalPoints = 0;

    rows.forEach(row => {
        const credit = parseInt(row.cells[2].textContent);
        const marksInput = row.cells[3].querySelector('.marks');
        let marks = parseInt(marksInput.value);

        // Validate the marks
        if (isNaN(marks) || marks < 0 || marks > 100) {
            marksInput.style.borderColor = 'red'; // Change border color to red for invalid input
            return; // Skip this row if marks are invalid
        } else {
            marksInput.style.borderColor = ''; // Reset border color for valid input
        }

        const grade = getGrade(marks);
        const gradePoint = gradePoints[grade];

        totalCredits += credit;
        totalPoints += credit * gradePoint;
    });

    const sgpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
    document.getElementById(`sgpa${semester}`).textContent = sgpa;
    calculateCGPA();
}

function calculateCGPA() {
    let totalSGPA = 0;
    let totalCredits = 0;

    for (let i = 1; i <= 8; i++) { // Loop through each semester
        const sgpaText = document.getElementById(`sgpa${i}`);
        if (sgpaText) {
            const sgpa = parseFloat(sgpaText.textContent);
            if (sgpa > 0) {
                // Get the total credits for that semester
                const semesterRows = document.querySelectorAll(`#semester${i} tr`);
                let semesterCredits = 0;

                // Loop through each row of the semester and sum the credits
                semesterRows.forEach(row => {
                    const creditCell = row.cells[2]; // Credits are in the 3rd cell (index 2)
                    if (creditCell) {
                        const credit = parseInt(creditCell.textContent);
                        semesterCredits += credit;
                    }
                });

                totalCredits += semesterCredits;
                totalSGPA += sgpa * semesterCredits;
            }
        }
    }

    const cgpa = totalCredits > 0 ? (totalSGPA / totalCredits).toFixed(2) : "0.00";
    document.getElementById('cgpa').textContent = cgpa;
}


    