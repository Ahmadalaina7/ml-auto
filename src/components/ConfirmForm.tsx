"use client";

/** Inline bevestigingsformulieren voor admin-acties (Verwijderen, Heropenen, enz.). */
export function ConfirmForm({
  message,
  action,
  children,
}: {
  message: string;
  action: (formData: FormData) => Promise<void>;
  children: React.ReactNode;
}) {
  return (
    <form
      action={(formData) => {
        if (window.confirm(message)) {
          void action(formData);
        }
      }}
    >
      {children}
    </form>
  );
}
ConfirmForm.displayName = "ConfirmForm";