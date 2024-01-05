import React, { useState, useEffect, useCallback } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { url } from '../utils/const';
import { useCookies } from 'react-cookie';

export default function Lists(props) {
  const { lists, selectListId, setSelectListId, setTasks } = props;
  const [cookies] = useCookies();

  const chnageFocus1 = () => {
    const listsLengthplus = lists.length + 1;
    document.getElementById('tab-' + listsLengthplus).focus();
  };
  const chnageFocus2 = () => {
    document.getElementById('tab-2').focus();
  };

  const handleSelectList = (id) => {
    console.log('setSelectListId', id);
    setSelectListId(id);
    axios
      .get(`${url}/lists/${id}/tasks`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        const oldIndex = lists.findIndex((ele) => ele.id === selectListId);
        const index = lists.findIndex((ele) => ele.id === id);
        console.log('oldIndex', oldIndex, 'index', index);
        // const selectedLitNum = lists.findIndex(e => e.id ===id)+1;
        document.getElementById('tab-' + (oldIndex + 2)).setAttribute('aria-selected', 'false');
        document.getElementById('tab-' + (index + 2)).setAttribute('aria-selected', 'true');
        setTasks(res.data.tasks);
      })
      .catch((err) => {
        setErrorMessage(`タスクの取得に失敗しました。${err}`);
      });
  };

  return (
    <>
      <div className="list-header">
        <h2>リスト一覧</h2>
        <div className="list-menu">
          <p>
            <Link to="/list/new">リスト新規作成</Link>
          </p>
          <p>
            <Link to={`/lists/${selectListId}/edit`}>選択中のリストを編集</Link>
          </p>
        </div>
      </div>
      <div>
        <ul className="list-tab" role="tablist">
          <span tabIndex="1" onFocus={chnageFocus1}></span>
          {lists.map((list, index) => {
            const isActive = list.id === selectListId;
            return (
              <li>
                <button
                  key={list.id}
                  id={'tab-' + (index + 2)}
                  className={`list-tab-item ${isActive ? 'active' : ''}`}
                  onClick={() => handleSelectList(list.id)}
                  tabIndex={index + 2}
                  role="tab"
                  aria-selected={index === 0}
                  aria-controls={'panel-' + (index + 2)}
                  autoFocus={list.id === selectListId}
                >
                  {list.title}
                </button>
              </li>
            );
          })}
          <span tabIndex={lists.length + 2} onFocus={chnageFocus2}></span>
        </ul>
      </div>
    </>
  );
}
