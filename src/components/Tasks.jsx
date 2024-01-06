import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// 表示するタスク
export default function Tasks(props) {
  const { tasks, selectListId, isDoneDisplay } = props;
  if (tasks === null) return <></>;

  if (isDoneDisplay == 'done') {
    return (
      <ul>
        {tasks
          .filter((task) => {
            return task.done === true;
          })
          .map((task, key) => (
            <li key={key} list id="test" className="task-item" role="tabpanel" aria-hidden="false">
              <Link to={`/lists/${selectListId}/tasks/${task.id}`} className="task-item-link">
                <p className="task-item-alignLeft">{task.title}</p>
                <p className="task-item-alignRight">
                  設定期日 :{taskListTimeFormat(task.limit)}
                  <br className="br768" />
                  残日数 :{diffTimeFormat(task.limit)}
                </p>
                <p className="task-item-alignRight">{task.done ? '完了' : '未完了'}</p>
              </Link>
            </li>
          ))}
      </ul>
    );
  }

  return (
    <ul>
      {tasks
        .filter((task) => {
          return task.done === false;
        })
        .map((task, key) => (
          <li key={key} className="task-item">
            <Link to={`/lists/${selectListId}/tasks/${task.id}`} className="task-item-link">
              <p className="task-item-alignLeft">{task.title}</p>
              <p className="task-item-alignRight">
                設定期日 :{taskListTimeFormat(task.limit)}
                <br className="br768" />
                残日数 :{diffTimeFormat(task.limit)}
              </p>
              <p className="task-item-alignRight">{task.done ? '完了' : '未完了'}</p>
            </Link>
          </li>
        ))}
    </ul>
  );
}

Tasks.propTypes = {
  tasks: PropTypes.array,
  selectListId: PropTypes.string,
  isDoneDisplay: PropTypes.string,
};

function taskListTimeFormat(date) {
  const time = new Date(date);
  const year = time.getFullYear();
  const month = ('0' + String(time.getMonth() + 1)).slice(-2);
  const day = ('0' + String(time.getDate())).slice(-2);
  const hour = ('0' + String(time.getHours())).slice(-2);
  const minutes = ('0' + String(time.getMinutes())).slice(-2);

  const format_time = ' ' + year + '-' + month + '-' + day + ' T' + hour + ':' + minutes;

  return format_time;
}

function diffTimeFormat(date) {
  const diffTime = Date.parse(date) - Date.now();
  const diffDay = Math.floor(diffTime / (24 * 60 * 60 * 1000));
  const diffHour = Math.floor((diffTime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const diffMinutes = Math.floor((diffTime % (60 * 60 * 1000)) / (60 * 1000));
  const diffSeconds = Math.floor((diffTime % (60 * 1000)) / 1000);
  if (diffTime >= 0) {
    return ' ' + diffDay + '日 ' + diffHour + '時間' + diffMinutes + '分' + diffSeconds + '秒';
  } else {
    return '期限切れ';
  }
}
