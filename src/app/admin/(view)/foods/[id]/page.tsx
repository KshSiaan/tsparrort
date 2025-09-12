import { Suspense } from "react";
import EditForm from "./edit-form";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const par = await params;

  return (
    <Suspense>
      <EditForm id={par.id} />
    </Suspense>
  );
}
