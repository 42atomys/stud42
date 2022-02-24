/*
Copyright © 2022 42Atomys

*/
package cmd

import (
	"bufio"
	"fmt"
	"os/exec"

	"github.com/rs/zerolog/log"
	"github.com/spf13/cobra"
)

var (
	interfacePortFlag, interfaceNextPath *string
)

// interfaceCmd represents the interface command
var interfaceCmd = &cobra.Command{
	Use:   "interface",
	Short: "Serve the NextJS interface in production",

	Run: func(cmd *cobra.Command, args []string) {
		// The static Next.js app will be served under `/`.
		yarn := exec.Command(*interfaceNextPath, "start", "web/ui", "--port", *interfacePortFlag)

		stdOut, err := yarn.StdoutPipe()
		if err != nil {
			log.Fatal().Err(err).Msg("Error creating StdoutPipe for Cmd")
		}
		defer stdOut.Close()

		scanner := bufio.NewScanner(stdOut)
		go func() {
			for scanner.Scan() {
				log.Info().Str("process", "interface").Msg(scanner.Text())
			}
		}()

		err = yarn.Start()
		if err != nil {
			log.Fatal().Err(err).Msg("Error during the start of interface")
		}

		log.Info().Str("process", "interface").Msgf("Serving NextJS interface on port %s", *interfacePortFlag)
		err = yarn.Wait()
		// go generate command will fail when no generate command find.
		if err != nil {
			if err.Error() != "exit status 1" {
				fmt.Println(err)
				log.Fatal().Err(err).Msg("Error during the execution of interface")
			}
		}
	},
}

func init() {
	serveCmd.AddCommand(interfaceCmd)

	interfacePortFlag = interfaceCmd.Flags().StringP("port", "p", "3000", "port used to serve the interface")
	interfaceNextPath = interfaceCmd.Flags().StringP("nextPath", "n", "web/ui/node_modules/next/dist/bin/next", "NextJS executable path")
}
