function updateTotal(element) {
    const row = element.closest('tr');
    const inputs = row.querySelectorAll('input');
    const theoryMarks = parseInt(inputs[0].value) || 0;
    const practicalMarks = parseInt(inputs[1].value) || 0;
    const totalMarks = theoryMarks + practicalMarks;
    const totalMarksCell = row.querySelector('.total-mark');
    const totalInWordsCell = row.querySelector('.total-in-words');

    totalMarksCell.textContent = totalMarks;
    totalInWordsCell.textContent = numberToWords(totalMarks);

    updateGrandTotal();
}

function numberToWords(number) {
    if (number === 0) return 'zero zero';
    if (number === 100) return 'one hundred';

    const units = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    let word = '';



    if (number >= 100) {
        word += units[Math.floor(number / 100)] + ' hundred ';
        number %= 100;
    }

    if (number >= 20) {
        word += tens[Math.floor(number / 10)] + ' ';
        number %= 10;
    } else if (number >= 10) {
        word += teens[number - 10] + ' ';
        number = 0;
    }

    if (number > 0) {
        word += units[number] + ' ';
    }

    return word.trim();
}

function updateGrandTotal() {
    let grandTotal = 0;
    let subjectCount = 0;
    let passedSubjects = 0;

    document.querySelectorAll('.total-mark').forEach(cell => {
        const marks = parseInt(cell.textContent) || 0;
        grandTotal += marks;
        if (marks >= 50) {
            passedSubjects++;
        }
        subjectCount++;
    });

    const percentage = (grandTotal / (subjectCount * 100) * 100).toFixed(2);
    const grade = percentage >= 90 ? '(A+)' : percentage >= 80 ? '(A)' : percentage >= 70 ? '(B+)' : percentage >= 60 ? '(B)' : percentage >= 50 ? '(C)' : '(D)';
    const result=percentage<50?"FAIL":"PASS"

    document.querySelector('tfoot tr:first-child td').textContent = `GRAND TOTAL ${grandTotal}`;
    document.querySelector('tfoot tr:nth-child(2) td').textContent = `IN WORDS ${numberToWords(grandTotal).toUpperCase()}`;
    document.getElementById('percentage').textContent = `${percentage}%`;
    document.getElementById('grade').textContent = grade;
    document.getElementById('result').textContent = result;


}
