import { useEffect, useState } from 'react'
import TodoLogo from './components/TodoLogo'
import { ToDoModel } from './models/todo.model'
import { todoData } from './constants/todoData'
import { TodoTypeEnum } from './constants/todoTypeEnum'
import CheckBoxCustom from './components/CheckBoxCustom'
import ButtonAdd from './components/ButtonAdd'

function App() {
  const [mainList, setMainList] = useState<Array<ToDoModel>>(todoData)
  const [fruitList, setFruitList] = useState<Array<ToDoModel>>([])
  const [vegetableList, setVegetableList] = useState<Array<ToDoModel>>([])
  const [outSideMainList, setOutSideMainList] = useState<Array<ToDoModel>>([])
  const [inputTodo, setInputTodo] = useState<string>("")
  const [fruitTypeSelected, setFruitTypeSelected] = useState<boolean>(false)
  const [vegetableTypeSelected, setVegetableTypeSelected] = useState<boolean>(false)


  useEffect(() => {
    const timeout = setTimeout(() => {
      if (outSideMainList.length > 0) {
        if (outSideMainList[0].type === TodoTypeEnum.FRUIT) {
          let firstData = fruitList[0]
          const fruitData = fruitList.slice(1)
          setFruitList(fruitData)
          setMainList([...mainList, firstData])
          setOutSideMainList(outSideMainList.slice(1))
        } else if (outSideMainList[0].type === TodoTypeEnum.VEGETABLE) {
          let firstData = vegetableList[0]
          const vegetableData = vegetableList.slice(1)
          setVegetableList(vegetableData)
          setMainList([...mainList, firstData])
          setOutSideMainList(outSideMainList.slice(1))
        }
      }
    }, 5000)
    return () => clearTimeout(timeout)
  }, [mainList])

  const onClickMainListItem = (value: ToDoModel) => {
    if (value.type === TodoTypeEnum.FRUIT) {
      setFruitList([...fruitList, value])
      setOutSideMainList([...outSideMainList, value])
      setMainList(prevMainList => prevMainList.filter((item: ToDoModel) => item.name !== value.name))
    } else if (value.type === TodoTypeEnum.VEGETABLE) {
      setVegetableList([...vegetableList, value])
      setOutSideMainList([...outSideMainList, value])
      setMainList(prevMainList => prevMainList.filter((item: ToDoModel) => item.name !== value.name))
    }
  }

  const onRemoveFruit = (value: ToDoModel) => {
    setFruitList(fruitList.filter((item: ToDoModel) => item.name !== value.name))
    setOutSideMainList(outSideMainList.filter((item: ToDoModel) => item.name !== value.name))
    setMainList([...mainList, value])
  }

  const onRemoveVegetable = (value: ToDoModel) => {
    setVegetableList(vegetableList.filter((item: ToDoModel) => item.name !== value.name))
    setOutSideMainList(outSideMainList.filter((item: ToDoModel) => item.name !== value.name))
    setMainList([...mainList, value])
  }

  const onInputTodoChange = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault()
    setInputTodo(event.currentTarget.value);
  }

  const onFruitTypeSelected = () => {
    if (!fruitTypeSelected) {
      setFruitTypeSelected(true)
    }
    setVegetableTypeSelected(false)
  }

  const onVegetableTypeSelected = () => {
    if (!fruitTypeSelected) {
      setVegetableTypeSelected(true)
    }
    setFruitTypeSelected(false)
  }

  const validateTodoInput = () => {
    if (inputTodo === "" || (fruitTypeSelected === false && vegetableTypeSelected === false)) return false;

    let list = [...mainList, ...outSideMainList]
    let type = fruitTypeSelected ? TodoTypeEnum.FRUIT : TodoTypeEnum.VEGETABLE
    let filtered = list.filter((item: ToDoModel) => item.name.toLowerCase() === inputTodo.toLowerCase() && item.type === type)

    if (filtered.length > 0) return false;

    return true
  }

  const onAddTodoClick = () => {
    let newData: ToDoModel = {
      name: inputTodo,
      type: fruitTypeSelected ? TodoTypeEnum.FRUIT : TodoTypeEnum.VEGETABLE
    }
    setMainList([...mainList, newData])
    setInputTodo("")
    setFruitTypeSelected(false)
    setVegetableTypeSelected(false)
  }

  return (
    <div className='w-full h-auto min-h-screen flex flex-col gap-3 py-3 bg-third items-center px-2 xl:px-[200px]'>
      <TodoLogo />
      <div className='w-full flex flex-row flex-wrap gap-2 justify-center items-center'>
        <input type="text" value={inputTodo} onChange={onInputTodoChange} placeholder='add todo...' className='rounded-md outline-none p-2 text-gray-700' />
        <div className='flex gap-2 justify-center items-center'>
          <CheckBoxCustom text={TodoTypeEnum.FRUIT} value={fruitTypeSelected} onChange={onFruitTypeSelected} />
          <CheckBoxCustom text={TodoTypeEnum.VEGETABLE} value={vegetableTypeSelected} onChange={onVegetableTypeSelected} />
        </div>
        <ButtonAdd isDisable={!validateTodoInput()} onClick={onAddTodoClick} />
      </div>
      <div className='w-full grid grid-cols-2 md:grid-cols-3 gap-2'>
        {/* Main List Section */}
        <div className='w-full h-auto bg-white rounded-md shadow-md flex flex-col items-start col-span-2 md:col-span-1'>
          <div className='rounded-t-md bg-gray-800 text-white text-center font-bold p-2 w-full'>
            Main List
          </div>
          <div className='grid grid-cols-2 sm:grid-cols-4  md:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-2 w-full py-3 px-2'>
            {
              mainList.map((value: ToDoModel, index) => (
                <div key={index} className='py-2 text-white bg-gray-800 rounded-md cursor-pointer hover:animate-bounce text-center'
                  onClick={() => onClickMainListItem(value)}
                >
                  {value.name}
                </div>
              ))
            }
          </div>
        </div>
        {/* Fruit Section */}
        <div className='w-full h-auto bg-white rounded-md shadow-md flex flex-col items-start'>
          <div className='rounded-t-md bg-gradient-to-tr from-secondary via-orange-400 to-fourth text-black font-bold text-center p-2 w-full'>
            Fruit List
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-2 w-full py-3 px-2'>
            {
              fruitList.map((value: ToDoModel, index) => (
                <div key={index} className={`py-2 text-white bg-amber-600 rounded-md cursor-pointer hover:animate-bounce text-center hover:bg-red-400  duration-100 ${value.name === outSideMainList[0].name && value.type === outSideMainList[0].type ? 'animate-blinkingBg' : ''}`}
                  onClick={() => onRemoveFruit(value)}
                >
                  {value.name}
                </div>
              ))
            }
          </div>
        </div>
        {/* Vegetable Section */}
        <div className='w-full h-auto bg-white rounded-md shadow-md flex flex-col items-start'>
          <div className='rounded-t-md bg-gradient-to-tr from-third via-green-400 to-secondary text-black font-bold text-center p-2 w-full'>
            Vegetable List
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-2 w-full py-3 px-2'>
            {
              vegetableList.map((value: ToDoModel, index) => (
                <div key={index} className={`py-2 text-white bg-emerald-400 rounded-md cursor-pointer hover:animate-bounce text-center hover:bg-red-400 duration-100 ${value.name === outSideMainList[0].name && value.type === outSideMainList[0].type ? 'animate-blinkingBg' : ''}`}
                  onClick={() => onRemoveVegetable(value)}
                >
                  {value.name}
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
