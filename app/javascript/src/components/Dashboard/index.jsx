import React, { useEffect, useState } from "react";

import tasksApi from "apis/tasks";
import { Container, PageLoader, PageTitle } from "components/commons";
import Table from "components/Tasks/Table";
import { all, either, isEmpty, isNil } from "ramda";

const Dashboard = ({ history }) => {
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const {
        data: {
          tasks: { pending, completed },
        },
      } = await tasksApi.fetch();
      setPendingTasks(pending);
      setCompletedTasks(completed);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleProgressToggle = async ({ slug, progress }) => {
    try {
      await tasksApi.update({
        slug,
        payload: { progress },
        quiet: true,
      });
      await fetchTasks();
    } catch (error) {
      logger.error(error);
    }
  };

  const destroyTask = async slug => {
    try {
      await tasksApi.destroy({ slug, quiet: true });
      await fetchTasks();
    } catch (error) {
      logger.error(error);
    }
  };

  const showTask = slug => {
    history.push(`/tasks/${slug}/show`);
  };

  const starTask = async (slug, status) => {
    try {
      const toggledStatus = status === "starred" ? "unstarred" : "starred";
      await tasksApi.update({
        slug,
        payload: { status: toggledStatus },
        quiet: true,
      });
      await fetchTasks();
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  if (all(either(isNil, isEmpty), [pendingTasks, completedTasks])) {
    return (
      <Container>
        <h1 className="my-5 text-center text-xl leading-5">
          You have not created or been assigned any tasks 🥳
        </h1>
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex flex-col gap-y-8">
        <PageTitle title="Todo list" />
        {!either(isNil, isEmpty)(pendingTasks) && (
          <Table
            data={pendingTasks}
            destroyTask={destroyTask}
            handleProgressToggle={handleProgressToggle}
            showTask={showTask}
            starTask={starTask}
          />
        )}
        {!either(isNil, isEmpty)(completedTasks) && (
          <Table
            data={completedTasks}
            destroyTask={destroyTask}
            handleProgressToggle={handleProgressToggle}
            type="completed"
          />
        )}
      </div>
    </Container>
  );
};

export default Dashboard;
