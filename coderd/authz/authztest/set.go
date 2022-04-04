package authztest

import (
	"strings"

	"github.com/coder/coder/coderd/authz"
)

type Set []*authz.Permission

var _ Iterable = (Set)(nil)

// Permissions is a helper function to get the Permissions as non-pointers.
// <nil> permissions are omitted
func (s Set) Permissions() []authz.Permission {
	perms := make([]authz.Permission, 0, len(s))
	for i := range s {
		if s[i] != nil {
			perms = append(perms, *s[i])
		}
	}
	return perms
}

func (s Set) Iterator() Iterator {
	return Union(s)
}

func (s Set) String() string {
	var str strings.Builder
	sep := ""
	for _, v := range s {
		if v == nil {
			continue
		}
		_, _ = str.WriteString(sep)
		_, _ = str.WriteString(v.String())
		sep = ", "
	}
	return str.String()
}