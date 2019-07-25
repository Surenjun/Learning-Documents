import * as React from 'react';
// import './index.less';
import * as T from './types';

const {useState, useEffect, useReducer, useCallback, useMemo} = React;
const AppsMain = (props) => {
    const [name, setName] = useState(() => createState());
    const [state, dispatch] = useReducer(reducer, 100, init);

    useEffect(() => {
        console.log('state更新为', state)
    }, [state]);

    const memoizedCallback = useCallback(
        () => {
            // 一些计算
            console.log(state + 1)
            return state;
        },
        [],
    );
    console.log('记忆 state > ', memoizedCallback());
    console.log('原始 state > ', state);
    return (
        <div>
            <p> {name} 的主頁</p>
            <Main />
            <>
              Count: {state.count}
              <button
                onClick={() => dispatch({type: 'reset', payload: 100})}>
                Reset
              </button>
              <button onClick={() => dispatch({type: 'increment'})}>+</button>
              <button onClick={() => dispatch({type: 'decrement'})}>-</button>
            </>
        </div>)
}

function init(initialCount) {
  return {count: initialCount};
}

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return {count: state.count + 1};
        case 'decrement':
            return {count: state.count - 1};
        case 'reset':
            return init(action.payload);
        default:
            throw new Error();
    }
}

const createState = () => 'surenjun';
const changeState = () => 'surenjun123';

class Main extends React.Component<T.IProps, any> {

    render() {
        return (
            <div className='info-a'>
                <p>main组件</p>
            </div>
        );
    }
}

export default AppsMain as any;
