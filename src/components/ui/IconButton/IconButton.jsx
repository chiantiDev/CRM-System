import style from './IconButton.module.css'

const IconButton = ({
                      type,
                      isModeButtons,
                      onClick,
                    }) => {

  const buttonVisibility = {
    viewing: ['edit', 'delete'],
    editing: ['save', 'cancel']
  };

  const iconButtonClasses = [
    style.iconButton,
    style[type],
    buttonVisibility[isModeButtons].includes(type) ? style.visible : ''
  ].filter(Boolean).join(' ');

  return (
    <button className={iconButtonClasses}
            onClick={onClick}></button>
  )
}

export default IconButton