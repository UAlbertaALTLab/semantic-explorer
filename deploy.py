#!/usr/bin/env python3
from subprocess import check_call

def main():
    check_call(["git", "pull"])
    check_call(["docker-compose", "build"])
    check_call(["docker-compose", "up", "-d"])


if __name__ == "__main__":
    main()
