"use client";

import type { Student, StudentsStepProps } from "@/types/types";
import { createEmptyStudent } from "@/types/types";
import FormField from "../FormField/FormField";
import ArmenianLevelSelect from "../ArmenianLevelSelect/ArmenianLevelSelect";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowLeftIcon, ArrowRightSizedIcon, CalendarIcon, PlusIcon, RemoveIcon } from "../icons/Icons";


export default function StudentsStep({ data, onChange, onBack, onContinue }: StudentsStepProps) {
  const { dict } = useLanguage();
  const raw = dict?.freeLesson?.students ?? {};

  const t = {
    back: raw.back ?? "Back",
    studentLabel: raw.studentLabel ?? "Student",
    firstName: raw.firstName ?? "First Name",
    firstNamePlaceholder: raw.firstNamePlaceholder ?? "e.g. Ani",
    lastName: raw.lastName ?? "Last Name",
    lastNamePlaceholder: raw.lastNamePlaceholder ?? "Hovhannisyan",
    birthDate: raw.birthDate ?? "Birth Date",
    addAnotherStudent: raw.addAnotherStudent ?? "Add Another Student",
    removeStudent: raw.removeStudent ?? "Remove student",
    continue: raw.continue ?? "Continue",
  };

  // Ստուգում ենք, արդյոք բոլոր ուսանողների անունը, ազգանունը և ծննդյան ամսաթիվը լրացված են
  const areStudentsValid =
    data.students.length > 0 &&
    data.students.every(
      (student) =>
        student.firstName.trim() !== "" &&
        student.lastName.trim() !== "" &&
        student.birthDate.trim() !== ""
    );

  function updateStudent(id: string, patch: Partial<Student>) {
    onChange({
      students: data.students.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    });
  }

  function addStudent() {
    onChange({ students: [...data.students, createEmptyStudent()] });
  }

  function removeStudent(id: string) {
    if (data.students.length <= 1) return;
    onChange({ students: data.students.filter((s) => s.id !== id) });
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!areStudentsValid) return; 
        onContinue();
      }}
      className="flex w-full flex-col gap-5 rounded-[32px] border border-[#EDEDED] bg-white p-10 shadow-sm"
    >
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 self-start text-base font-semibold text-[#999999] hover:text-[#F15A22]"
      >
        <ArrowLeftIcon />
        {t.back}
      </button>

      <div className="flex flex-col items-end gap-2.5">
        {data.students.map((student, index) => (
          <div
            key={student.id}
            className="flex w-full flex-col gap-2.5 rounded-2xl border border-[#EDEDED] bg-[#F4F4F4] p-4"
          >
            <div className="flex w-full items-center justify-between">
              <span className="text-sm font-semibold text-[#2D2D2D]">
                {t.studentLabel} {index + 1}
              </span>
              {data.students.length > 1 && (
                <button
                  type="button"
                  aria-label={t.removeStudent}
                  onClick={() => removeStudent(student.id)}
                  className="text-[#666666] transition-colors hover:text-[#F15A22]"
                >
                  <RemoveIcon />
                </button>
              )}
            </div>

            {/* Անուն / Ազգանուն */}
            <div className="flex flex-wrap gap-4">
              <div className="min-w-[240px] flex-1">
                <FormField
                  id={`firstName-${student.id}`}
                  label={t.firstName}
                  required
                  placeholder={t.firstNamePlaceholder}
                  value={student.firstName}
                  onChange={(e) => updateStudent(student.id, { firstName: e.target.value })}
                />
              </div>
              <div className="min-w-[240px] flex-1">
                <FormField
                  id={`lastName-${student.id}`}
                  label={t.lastName}
                  required
                  placeholder={t.lastNamePlaceholder}
                  value={student.lastName}
                  onChange={(e) => updateStudent(student.id, { lastName: e.target.value })}
                />
              </div>
            </div>

            {/* Ծննդյան ամսաթիվ / Հայերենի մակարդակ */}
            <div className="flex flex-wrap gap-4">
              <div className="min-w-[240px] flex-1">
                <FormField
                  id={`birthDate-${student.id}`}
                  label={t.birthDate}
                  required
                  type="date"
                  icon={<CalendarIcon />}
                  value={student.birthDate}
                  onChange={(e) => updateStudent(student.id, { birthDate: e.target.value })}
                />
              </div>
              <div className="min-w-[240px] flex-1">
                <ArmenianLevelSelect
                  value={student.armenianLevel}
                  onChange={(armenianLevel) => updateStudent(student.id, { armenianLevel })}
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addStudent}
          className="flex items-center gap-2 rounded-2xl border border-dashed border-black/[0.18] px-4 py-2.5 text-sm font-medium text-[#666666] transition-colors hover:border-[#F15A22] hover:text-[#F15A22]"
        >
          <PlusIcon />
          {t.addAnotherStudent}
        </button>
      </div>

      <button
        type="submit"
        disabled={!areStudentsValid}
        className={`flex w-full items-center justify-center gap-2.5 rounded-full py-4 text-base font-semibold text-[#F15A22] transition-opacity ${
          !areStudentsValid ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"
        }`}
      >
        {t.continue}
        <ArrowRightSizedIcon />
      </button>
    </form>
  );
}