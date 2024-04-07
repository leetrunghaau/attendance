import React, { Fragment, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SvgIcon from '../../Components/Common/Component/SvgIcon';
import CustomizerContext from '../../_helper/Customizer';
import { MENUITEMS } from './Menu';
import SweetAlert from "sweetalert2";
import { useSelector } from 'react-redux';

const SidebarMenuItems = ({ setMainMenu, sidebartoogle, setNavActive, activeClass }) => {
  const { layout } = useContext(CustomizerContext);
  const { details} = useSelector(state => state.login);
  const layout1 = localStorage.getItem('sidebar_layout') || layout;

  const id = window.location.pathname.split('/').pop();
  const layoutId = id;
  const CurrentPath = window.location.pathname;


  const { t } = useTranslation();
  const toggletNavActive = (item) => {
    if (window.innerWidth <= 991) {
      document.querySelector('.page-header').className = 'page-header close_icon';
      document.querySelector('.sidebar-wrapper').className = 'sidebar-wrapper close_icon ';
      document.querySelector('.mega-menu-container').classList.remove('d-block');
      if (item.type === 'sub') {
        document.querySelector('.page-header').className = 'page-header';
        document.querySelector('.sidebar-wrapper').className = 'sidebar-wrapper';
      }
    }
    if (!item.active) {
      console.log("GGGGGGGGGGG", item);
      MENUITEMS.map((a) => {
        a.Items.filter((Items) => {
          if (a.Items.includes(item)) Items.active = false;
          if (!Items.children) return false;
          Items.children.forEach((b) => {
            if (Items.children.includes(item)) {
              b.active = false;
            }
            if (!b.children) return false;
            b.children.forEach((c) => {
              if (b.children.includes(item)) {
                c.active = false;
              }
            });
          });
          return Items;
        });
        return a;
      });
    }
    item.active = true;// !item.active;
    console.log("RESULT==>", item);
    setMainMenu({ mainmenu: MENUITEMS });
  };

  const isActive = (menuItem) => {
    return CurrentPath.toLocaleLowerCase().includes(menuItem.title.toLowerCase()) || CurrentPath.toLocaleLowerCase().includes(menuItem.compareActive?.toLowerCase());
  }

  const showMessage=(message)=>{
    SweetAlert.fire({
      title: 'Thông báo',
      text:  message,
      icon: 'warning',
      confirmButtonText: 'Đóng',
      reverseButtons: true,
      customClass: {
          confirmButton: 'btn btn-primary',
      }
  })
  }

  return (
    <>
      {
      MENUITEMS.map((Item, i) => {
      if(Item.ROLE && (
          !Item.ROLE.includes(details.Role)
          &&!Item.ROLE.includes(details.Khoi)
          )          
        )
      {
        return(<></>);
      }
      else
        return(    
          <Fragment key={i}>
            {
              Item.menutitle &&
              <li className='sidebar-main-title'>
                <div>
                  <h6 className='lan-1'>{t(Item.menutitle)}</h6>
                </div>
              </li>
            }
            {Item.Items.map((menuItem, i) => {
             
             if(menuItem.ROLE && (
              !menuItem.ROLE.includes(details.Role)
              &&!menuItem.ROLE.includes(details.Khoi)
              )          
            )
               {
                 return(<></>);
               }
               else
              return(
              <li className='sidebar-list' key={i}>
                {menuItem.type === 'sub' ? (
                  <a
                    href='javascript'
                    className={`sidebar-link sidebar-title ${isActive(menuItem) ? 'active' : ''} ${menuItem.active && 'active'}`}
                    onClick={(event) => {
                      event.preventDefault();
                      setNavActive(menuItem);
                      activeClass(menuItem.active);
                    }}>
                    <SvgIcon className='stroke-icon' iconId={`stroke-${menuItem.icon}`} />
                    <SvgIcon className='fill-icon' iconId={`fill-${menuItem.icon}`} />
                    {/* <i className='fa fa-angle-down'></i> */}
                    <span>{t(menuItem.title)}</span>
                    {menuItem.badge ? <label className={menuItem.badge}>{menuItem.badgetxt}</label> : ''}
                    <div className='according-menu'>{menuItem.active ? <i className='fa fa-angle-down'></i> : <i className='fa fa-angle-right'></i>}</div>
                  </a>
                ) : (
                  ''
                )}

                {menuItem.type === 'link' ? (
                  <Link to={menuItem.path + '/' + layoutId} className={`sidebar-link sidebar-title link-nav  ${isActive(menuItem) ? 'active' : ''}`} onClick={() => toggletNavActive(menuItem)}>
                    <SvgIcon className='stroke-icon' iconId={`stroke-${menuItem.icon}`} />
                    <SvgIcon className='fill-icon' iconId={`fill-${menuItem.icon}`} />
                    {/* <i className='fa fa-angle-down'></i> */}
                    <span>{t(menuItem.title)}</span>
                    {menuItem.badge ? <label className={menuItem.badge}>{menuItem.badgetxt}</label> : ''}
                  </Link>
                ) : (
                  ''
                )}

                {menuItem.type === 'linkdirect' ? (
                  <a
                  href='javascript'
                  className={`sidebar-link sidebar-title`}
                  onClick={(event) => {
                    event.preventDefault();
                    setNavActive(menuItem);
                    activeClass(menuItem.active);
                    showMessage("Bạn chưa được phân quyền vào chức năng này")
                  }}>
                  <SvgIcon className='stroke-icon' iconId={`stroke-${menuItem.icon}`} />
                  <SvgIcon className='fill-icon' iconId={`fill-${menuItem.icon}`} />
                  <span>{t(menuItem.title)}</span>
                  {menuItem.badge ? <label className={menuItem.badge}>{menuItem.badgetxt}</label> : ''}
                  </a>
                ) : (
                  ''
                )}

                {menuItem.children ? (
                  <ul className='sidebar-submenu' style={layout1 !== 'compact-sidebar compact-small' ? (menuItem?.active || isActive(menuItem) ? (sidebartoogle ? { opacity: 1, transition: 'opacity 500ms ease-in' } : { display: 'block' }) : { display: 'none' }) : { display: 'none' }}>
                    {menuItem.children.map((childrenItem, index) => {
                    if(childrenItem.ROLE && (
                      !childrenItem.ROLE.includes(details.Role)
                      &&!childrenItem.ROLE.includes(details.Khoi)
                      )          
                    )
                      {
                        return(<></>);
                      }
                      else
                     return(
                        <li key={index}>
                          {childrenItem.type === 'sub' ? (
                            <a
                              href=''
                              className={`${isActive(childrenItem) ? 'active' : ''}`}
                              // className={`${childrenItem.active ? 'active' : ''}`}
                              onClick={(event) => {
                                event.preventDefault();
                                toggletNavActive(childrenItem);
                              }}>
                              {t(childrenItem.title)}
                              <span className='sub-arrow'>
                                <i className='fa fa-chevron-right'></i>
                              </span>
                              <div className='according-menu'>{childrenItem.active ? <i className='fa fa-angle-down'></i> : <i className='fa fa-angle-right'></i>}</div>
                            </a>
                          ) : (
                            ''
                          )}

                          {childrenItem.type === 'link' ? (
                            <Link
                              to={childrenItem.path + '/' + layoutId}
                              className={`${isActive(childrenItem) ? 'active' : ''}`}
                              // className={`${childrenItem.active ? 'active' : ''}`} bonusui
                              onClick={() => toggletNavActive(childrenItem)}>
                              {t(childrenItem.title)}
                            </Link>
                          ) : (
                            ''
                          )}

                          {childrenItem.children ? (
                            <ul className='nav-sub-childmenu submenu-content' style={isActive(childrenItem) || childrenItem.active ? { display: 'block' } : { display: 'none' }}>
                              {childrenItem.children.map((childrenSubItem, key) => {
                               if(childrenSubItem.ROLE && (
                                !childrenSubItem.ROLE.includes(details.Role)
                                ||!childrenSubItem.ROLE.includes(details.Khoi)
                                )          
                              )
                                 {
                                   return(<></>);
                                 }
                                 else
                                return(
                                <li key={key}>
                                  {childrenSubItem.type === 'link' ? (
                                    <Link
                                      to={childrenSubItem.path + '/' + layoutId}
                                      className={`${isActive(childrenSubItem) ? 'active' : ''}`}
                                      // className={`${childrenSubItem.active ? 'active' : ''}`}
                                      onClick={() => toggletNavActive(childrenSubItem)}>
                                      {t(childrenSubItem.title)}
                                    </Link>
                                  ) : (
                                    ''
                                  )}
                                </li>
                              )}
                              )}
                            </ul>
                          ) : (
                            ''
                          )}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  ''
                )}
              </li>
              )
            }
            )}
          </Fragment>
        )
      }
      )}
    </>
  );
};

export default SidebarMenuItems;
