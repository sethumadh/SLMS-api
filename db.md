My requirement is now different. The student will enroll to a subject in a term and not subjectGroup or the levels in a subject. The student should be able to enroll for multiple subjects across any
subject in a term and these subjects can belong to different subjectgroup.

The student is charged a fee based on which subject group he belongs to. WHihc means , A student can take as many subjects in a subjectgroup and will be charged only a flat fee for the subject group.
FOr example, Term 1 , of 6 months period, has two subject groups. Group 1 contains one subject called music , having levels L1 and L2 and fee for the group is 200 and is mothly charged Second subject
group called group 2 , contains three subjects called maths , english, biology , each having levels L1 and L2 and L3 and fee for the group is 100 and is charged every three months.

A student called bob can enroll to music and maths and english and will be charged 200+100 = 300

So the fee payable by bob for music is monthly, since group 1 os monthly charged and for maths and english is paid every 3 months sinc group 2 is charged 3 months.

So bob should be charged fee and fee payable amount and due date based on subject group. But bob should be enrolled to a subject in a term . enrolling bob to a subject in a term will enure the teacher
to give feedback for bob for a subject in a term.

Now suggest what modifictaion is to be made in my schema. for enrollment , fee, termsubject and any other tables/models to be modified.

Bob can also enroll in term 2 , and can enroll for group 2 for maths and english . Which means admin should be able to query historical data for bob in term 1 . So which means term should be
considered along with subjects for enrolling bob right?

1)Now my requiremnt is i need to make sections for each subject at the level in a term. And this will be unique for a term for a subject and for a level. therefore A term called term1 can have subject
called Maths with two levels L1 and L2. we can sections like S1 and S2 sections for Maths at L1 level. We can also have section like S1 and S2 and S3 sections for Maths L2 Level. A section name cannot
appear twice for a subject and level , for example, Maths at L1 level cannot have S1 twice. Modify my schema to create a new model for section and other association. I also need to re use the sections
names across different term .

2)also , as an example, now bob is enrolled to music , which is under group 1. and is assigned to music L1 S1. bob is also enrolled to maths and english which is under group2 and is assigned to class
maths L2S1 and english L2S1. bob is then re assigned from maths L2S1. to maths L2S2. and from english L2S1. to english L1S1.

so admin should be able to change classes like the above.

I making the section at the levels for a subject. Meaning i want to create sections for L1 and L2 for a subject. Also To enable tracking of historical data about student enrollments in classes like
"Maths L1 S1" or "Maths L2 S2" over different terms,

3)for this requirment "I need to get the historical data of which class like "Maths L1 S1" or "Maths L2 S2" the student is assigned to . so the admin should be able to see how and where the students
are assigned to which class in previous terms."

4)So shouldnt I create a new model called termsubjectlevel model? why or why not. like between SubjectEnrollment and TermSubjectLevel seems to be a one-to-many relationship from SubjectEnrollment to
TermSubjectLevel, and a one-to-one relationship from TermSubjectLevel to SubjectEnrollment.
