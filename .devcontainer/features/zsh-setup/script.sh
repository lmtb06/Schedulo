#!/bin/bash
set -e

# Ensure Zsh is installed
if ! command -v zsh > /dev/null 2>&1; then
    echo "Zsh is not installed. Please ensure 'common-utils' feature is applied with 'installZsh' set to true."
    exit 1
fi

# Function to clone with depth 1 if a repo URL is provided
clone_with_depth() {
    local repo_url=$1
    local target_dir=$2
    git clone --depth 1 "$repo_url" "$target_dir"
}

# Install specified plugins
IFS=','
for plugin in $PLUGINS; do
    IFS=':' read -r plugin_name plugin_repo <<< "$plugin"

    if [ -n "$plugin_repo" ]; then
        target_dir="${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/plugins/$plugin_name"
        mkdir -p "$target_dir"
        clone_with_depth "$plugin_repo" "$target_dir"
    fi

    if ! grep -E "plugins=.*\b$plugin_name\b" "$HOME/.zshrc"; then
        # Append the plugin name to the plugins line if it exists, otherwise, create the plugins line
        if grep -q "^plugins=" "$HOME/.zshrc"; then
            # If plugins line exists, append the plugin name at the end, ensuring no duplicate
            sed -i "/^plugins=/ s/)/ $plugin_name)/" "$HOME/.zshrc"
        else
            # If no plugins line, create it with the plugin name
            echo "plugins=($plugin_name)" >> "$HOME/.zshrc"
        fi
    fi

done

# Install specified themes
IFS=','
for theme in $THEMES; do
    IFS=':' read -r theme_name theme_repo <<< "$theme"

    if [ -n "$theme_repo" ]; then
        target_dir="${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/$theme_name"
        mkdir -p "$target_dir"
        clone_with_depth "$theme_repo" "$target_dir"
    fi
done

# Définir le thème par défaut
if [ -n "${DEFAULTTHEME}" ]; then
    # Check if ZSH_THEME is already set in .zshrc
    if grep -q "^ZSH_THEME=" "$HOME/.zshrc"; then
        # Update the existing ZSH_THEME line
        sed -i "s|^ZSH_THEME=.*|ZSH_THEME=\"${DEFAULTTHEME}\"|" "$HOME/.zshrc"
    else
        # Append ZSH_THEME line at the end if it doesn't exist
        echo "ZSH_THEME=\"${DEFAULTTHEME}\"" >> "$HOME/.zshrc"
    fi
fi


unset IFS

echo 'Custom Zsh configuration applied successfully.'
