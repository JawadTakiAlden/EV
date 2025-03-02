import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDeActivateUser } from "../../api/users";
import { useTranslation } from "react-i18next";

const ActivateController = ({
  isActive,
  isLoading,
}: {
  isActive: boolean;
  isLoading: boolean;
}) => {
  const deActivateUser = useDeActivateUser();
  const { t } = useTranslation();

  const [active, setActive] = useState(isActive);

  useEffect(() => {
    setActive(isActive);
  }, [isActive]);

  return (
    <Button
      variant="outlined"
      disabled={isLoading || deActivateUser.isPending}
      onClick={() => {
        deActivateUser.mutate();
      }}
    >
      {active
        ? t("userProfile.activation.activate")
        : t("userProfile.activation.deactivate")}
    </Button>
  );
};

export default ActivateController;
