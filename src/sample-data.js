import { addExperimentToDatabase } from './api';

// This is just sample-data

const data =
    [
        {
            "id": "uR7sTbKw",
            "subject": "الفيزياء",
            "grade": "الأول",
            "title": "تجربة الميزان البسيط",
            "tools": "ميزان، وزن",
            "materials": "شدة، قضيب",
            "instructions": "1. قم بتعليق الوزن على القضيب...\n2. قم بقياس الكتلة...",
            "precautions": "1. تأكد من تعليق الوزن بإحكام...\n2. ابتعد أثناء القياس...",
            "explanation": "فترة الميزان البسيط تعتمد..."
        },
        {
            "id": "gM5pRvLc",
            "subject": "الكيمياء",
            "grade": "الثاني",
            "title": "تجربة تفاعل الحمض مع القاعدة",
            "tools": "محلول حمضي، محلول قاعدي",
            "materials": "أنابيب اختبار، محلول مؤشر",
            "instructions": "1. املأ أنبوب اختبار بالحمض...\n2. أضف القاعدة تدريجياً...",
            "precautions": "1. ارتدي القفازات والنظارات الواقية...\n2. تجنب ملامسة البشرة...",
            "explanation": "تفاعل الحمض مع القاعدة ينتج..."
        },
        {
            "id": "wH2zXfPt",
            "subject": "البيولوجيا",
            "grade": "الثالث",
            "title": "تجربة نمو النباتات تحت إضاءة مختلفة",
            "tools": "أوعية زراعة، مصدر إضاءة",
            "materials": "بذور نباتية، تربة زراعية",
            "instructions": "1. ضع البذور في أوعية الزراعة...\n2. ضبط مصادر الإضاءة...",
            "precautions": "1. تجنب تعريض النباتات للحرارة الزائدة...\n2. راقب النمو بانتظام...",
            "explanation": "تؤثر شدة ونوع الإضاءة على..."
        },
        {
            "id": "sE9dZnYx",
            "subject": "علم الفلك",
            "grade": "الرابع",
            "title": "مراقبة الكواكب في السماء",
            "tools": "تلسكوب، كتالوج الكواكب",
            "materials": "منظار، ورقة وقلم",
            "instructions": "1. قم بضبط المنظار نحو الكوكب...\n2. قم بتسجيل الملاحظات...",
            "precautions": "1. تجنب استخدام المنظار بشكل مفرط...\n2. احفظ تسجيلاتك للملاحظات...",
            "explanation": "تتغير مواقع الكواكب في..."
        },
        {
            "id": "kP8bCmNa",
            "subject": "الفيزياء",
            "grade": "الخامس",
            "title": "تجربة القوى والحركة",
            "tools": "عربة محملة، سطح مائل",
            "materials": "كتلة، حبل",
            "instructions": "1. ضع العربة على السطح المائل...\n2. اسحب العربة بالحبل...",
            "precautions": "1. تأكد من أن العربة ثابتة قبل البدء...\n2. تجنب وجود عوائق أمام العربة...",
            "explanation": "تظهر القوى المؤثرة على..."
        },
        {
            "id": "mQ3oHjIe",
            "subject": "الكيمياء",
            "grade": "السادس",
            "title": "تجربة تفاعل الأكسدة والاختزال",
            "tools": "محلول مؤكسد، محلول مختزل",
            "materials": "أنابيب اختبار، محلول مؤشر",
            "instructions": "1. املأ أنبوب اختبار بالمحلول المؤكسد...\n2. أضف المحلول المختزل...",
            "precautions": "1. ارتدي القفازات والنظارات الواقية...\n2. تجنب ملامسة البشرة...",
            "explanation": "تعتمد تفاعلات الأكسدة والاختزال..."
        },
        {
            "id": "tF4kDlMb",
            "subject": "البيولوجيا",
            "grade": "الأول",
            "title": "تجربة تأثير درجات الحرارة على النمل",
            "tools": "علبة زجاجية، حرارة متغيرة",
            "materials": "قطع طعام، نمل",
            "instructions": "1. ضع النمل والطعام في العلبة...\n2. ضبط درجات الحرارة بشكل تدريجي...",
            "precautions": "1. تجنب تعريض النمل للحرارة الزائدة...",
            "explanation": "تؤثر درجات الحرارة على نشاط وتوزيع..."
        },
        {
            "id": "vN6wRqPx",
            "subject": "علم الفلك",
            "grade": "الثالث",
            "title": "تجربة قوانين كيبلر للحركة الكوكبية",
            "tools": "مقياس الزاوية، مقلمة",
            "materials": "محاكاة كواكب",
            "instructions": "1. قم بقياس زوايا الانحراف لكل كوكب...\n2. قم بتطبيق قوانين كيبلر...",
            "precautions": "1. تجنب الانحراف الكبير للمقلمة...\n2. تحسن من دقة القياسات...",
            "explanation": "قوانين كيبلر تصف علاقات حركة..."
        }
    ]


export const addData = async () => {
    for (const exp of data) {
        try {
            await addExperimentToDatabase(
                exp.id,
                exp.subject,
                exp.grade,
                exp.title,
                exp.tools,
                exp.materials,
                exp.instructions,
                exp.precautions,
                exp.explanation
            );
            console.log(`Experiment ${exp.expId} added successfully`);
        } catch (error) {
            console.error(`Error adding experiment ${exp.expId}:`, error);
        }
    }
};
