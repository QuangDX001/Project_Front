import "react-pro-sidebar/dist/css/styles.css"
import "./SideBar.scss"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent
} from 'react-pro-sidebar';
import { FaTachometerAlt, FaGem, FaRegLaughWink, FaHeart, FaList } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";

const SideBar = (props) => {
    const navigate = useNavigate()
    const account = useSelector((state) => state.user.account)
    const { collapsed, toggled, handleToggle } = props;

    return (
        <ProSidebar
            collapsed={collapsed}
            toggled={toggled}
            breakPoint="md"
            onToggle={handleToggle}
        >
            <SidebarHeader>
                <div
                    onClick={() => navigate('/')}
                    style={{
                        padding: "24px",
                        textTransform: "uppercase",
                        fontWeight: "bold",
                        fontSize: 14,
                        letterSpacing: "1px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        cursor: "pointer",
                    }}
                >
                    {"Homepage"}
                </div>
            </SidebarHeader>

            <SidebarContent>
                <Menu iconShape="circle">
                    {account.roles.includes("ROLE_ADMIN") && (
                        <>
                            <SubMenu
                                suffix={<span className="badge yellow"></span>}
                                title={"Admin"}
                                icon={<FaRegLaughWink />}
                            >
                                <MenuItem>
                                    User Management
                                    <Link to={"/manage/manage-account"} />
                                </MenuItem>
                            </SubMenu>
                        </>
                    )}
                    {account.roles.includes("ROLE_MODERATOR") && (
                        <>
                            <SubMenu
                                suffix={<span className="badge gray"></span>}
                                title={"Moderator"}
                                icon={<FaHeart />}
                            >
                                <MenuItem>
                                    Mod Board
                                    <Link to={"/manage/manage-staff"} />
                                </MenuItem>
                            </SubMenu>
                        </>
                    )}
                </Menu>
            </SidebarContent>

            <SidebarFooter style={{ textAlign: "center", cursor: "pointer" }}>
                <div
                    className="sidebar-btn-wrapper"
                    style={{
                        padding: "20px 24px",
                    }}
                    onClick={() => navigate("/")}
                >
                    <AiFillHome />
                </div>
            </SidebarFooter>
        </ProSidebar>
    )
}

export default SideBar