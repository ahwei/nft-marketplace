import React from "react";
import { styled } from "@mui/material/styles";
import NextLink from "next/link";
import { useRouter } from "next/router";
import {
  Link,
  Menu,
  Typography,
  MenuItem,
  Grow,
  Paper,
  MenuList,
  ClickAwayListener,
  Popper,
  Button,
  Divider,
  Grid,
} from "@mui/material";

type MenuSectionType = {
  selected?: Boolean;
};

export const MenuSection = styled("a")<MenuSectionType>(({ selected }) => ({
  marginLeft: 10,
  marginRight: 10,
  width: 90,
  cursor: "pointer",
  height: "100%",
  color: "#fff",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "&:hover": {
    color: "#dedede",
    // borderTop: `3px solid #fff`,
    textDecoration: "none",
  },
}));

export const MenuItemCustom = styled(MenuItem)(
  ({ notlast }: { notlast: string }) => ({
    margin: 0,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottom: notlast == "true" ? `1px solid #dedede` : "none",
  })
);

type Props = {
  title: string;
  href?: string;
  menuItems?: {
    href: string;
    title: string;
  }[];
};

const CustomMenu: React.FC<Props> = ({ title, href, menuItems }) => {
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<any>(null);
  const popRef = React.useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    setOpen(true);
  };

  const handleLeave = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <React.Fragment>
      <NextLink href={`/${href}`}>
        <MenuSection
          ref={anchorRef}
          onClick={() => {
            handleToggle();
          }}
          onMouseOver={handleClick}
          onMouseLeave={handleLeave}
          href={`/${href}`}
        >
          <Typography variant="h6">{title}</Typography>
        </MenuSection>
      </NextLink>

      {Boolean(menuItems) && (
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
          onMouseLeave={handleClose}
          onMouseOver={handleClick}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
              ref={popRef}
            >
              <Paper
                sx={{
                  width: 150,
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    left: 50,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} onKeyDown={handleListKeyDown}>
                    {menuItems?.map((item, index) => (
                      <MenuItemCustom
                        key={index}
                        onClick={() => {
                          handleLeave();
                          router.push(item.href);
                        }}
                        notlast={String(index !== menuItems.length - 1)}
                      >
                        <Typography variant="h6"> {item.title}</Typography>
                      </MenuItemCustom>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      )}
    </React.Fragment>
  );
};

export default CustomMenu;
