import "server-only";
import { forbidden, redirect } from "next/navigation";
import { getCustomerGroups } from "@/features/salesAssistant/api/getCustomerGroups";

export const assertUserHasAccessToSalesAssistant = async (
  userId: string | undefined,
) => {
  if (!userId) {
    redirect("/login");
  }

  const userWithGroups = await getCustomerGroups(userId);
  const isUserAnEmployee = userWithGroups.body.customerGroupAssignments.some(
    (group) => group.customerGroup.obj?.key === "employee",
  );

  if (!isUserAnEmployee) {
    forbidden();
  }

  return isUserAnEmployee;
};
