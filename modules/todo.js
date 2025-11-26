export default function Todo(
  title,
  description,
  dueDate,
  priority,
  notes = "",
  checklist = []
) {
  return {
    title,
    description,
    dueDate,
    priority,
    notes,
    checklist,
    completed: false,
  };
}