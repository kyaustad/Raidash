# Raidash

Raidash is a simple and intuitive dashboard designed for managing your UnRaid server. Built with Nuxt 3 and styled using Tailwind CSS, it provides real-time statistics and streamlines the creation and deletion of shortcuts, complete with icon and image support.

## Features

- **Stats**: Monitor your UnRaid server's basic stats with fresh data.
- **Shortcut Management**: Easily create and delete shortcuts to your favorite applications and services.
- **Icon & Image Support**: Customize your shortcuts with a wide array of icons and images.
- **Light & Dark Mode**: Supports light and dark mode in a highly stylized look. I kinda hate the light mode right now tbh...

## Usage
Raidash uses the unraid-api which is currently part of the Unraid Connect plugin for Unraid. To find details on how to set it up and get an API key see this: [Unraid-API](https://docs.unraid.net/API/how-to-use-the-api/)

When installing via Docker, such as on UnRaid, the environment variables needed are: UNRAID_KEY and UNRAID_URL. UNRAID_KEY is the API key generated from the unraid-api and the UNRAID_URL is the full http/https included address of your Unraid server.

- **Viewing Stats**: The dashboard displays real-time statistics of your UnRaid server on the main screen.
- **Managing Shortcuts**: Use the provided forms to add new shortcuts or remove existing ones.
- **Customizing Icons**: Select icons from the extensive collection available in the [selfh.st/icons](https://github.com/selfhst/icons) repository to personalize your shortcuts.

## Credits

Raidash utilizes icons from the [selfh.st/icons](https://github.com/selfhst/icons) collection, maintained by the selfh.st team. These icons are used under the [MIT License](https://github.com/selfhst/icons/blob/main/LICENSE).

## License

Raidash is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.


