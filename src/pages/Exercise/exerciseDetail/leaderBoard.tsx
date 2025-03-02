import React from "react";
import { useGetLeaderBoard } from "../../../api/exercise";
import Table from "../../../components/Table";
import { LeaderBoardColumns } from "../../../tables-def/leader-board";

const LeaderBoard = ({ excercise_id }: { excercise_id: number }) => {
  const leaders = useGetLeaderBoard(excercise_id);

  return (
    <Table data={leaders?.data?.data || []} columns={LeaderBoardColumns()} />
  );
};

export default LeaderBoard;
