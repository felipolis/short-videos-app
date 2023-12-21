import React, { useState } from "react"
import { useLocation, Link } from "react-router-dom"
import MenuItem from "./MenuItem"
import MenuItemSuggested from "./MenuItemSuggested"
import { useQuery } from "@apollo/client"
import { GET_USERS } from "../graphql/queries/getUsers"
import { User } from "../gql/graphql"

function SideNavMain() {
  const { data, loading, fetchMore } = useQuery(GET_USERS, {})
  const [showAllUsers, setShowAllUsers] = useState(false)

  const displayedUsers: User[] = showAllUsers
    ? data?.getUsers
    : data?.getUsers.slice(0, 3) // Only show the first 3 users

  return (
    <div
      id="SideNavMain"
      className={[
        useLocation().pathname === "/" ? "lg:w-[310px]" : "lg:w-[220px]",
        "fixed z-20 bg-white pt-[70px] h-full lg:border-r-0 border-r  overflow-auto",
      ].join(" ")}
    >
      <div className="lg:w-full w-[55px] mx-auto">
        <Link to="/">
          <MenuItem
            iconString="For You"
            colorString="#F02C56"
            sizeString="30"
          />
        </Link>
        <MenuItem
          iconString="Following"
          colorString="#000000"
          sizeString="27"
        />
        <MenuItem iconString="LIVE" colorString="#000000" sizeString="27" />
        <div className="mt-2 border-b lg:ml-2" />
        <div className="hidden px-2 pt-4 pb-2 text-xs font-semibold text-gray-600 lg:block">
          Suggested accounts
        </div>
        <div className="block pt-3 lg:hidden" />
        <ul>
          {displayedUsers?.map((user) => (
            <li className="cursor-pointer" key={user.id}>
              <Link to={`/profile/${user.id}`}>
                <MenuItemSuggested user={user} />
              </Link>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setShowAllUsers(!showAllUsers)}
          className="lg:block hidden text-[#F02C56] pt-1.5 pl-2 text-[13px]"
        >
          See more
        </button>
      </div>
    </div>
  )
}

export default SideNavMain